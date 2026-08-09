import mongoose from "mongoose";

import WireTransfer from "@/models/wire/WireTransfer";

import { updateWireStatus } from "@/services/wire/updateWireStatus";
import { updateTransactionStatus } from "@/services/transaction/updateTransactionStatus";
import { createNotification } from "@/services/notification/createNotification";

interface ApproveWireTransferInput {
  wireId: string;

  adminId: string;
}

export async function approveWireTransfer({
  wireId,
  adminId,
}: ApproveWireTransferInput) {
  const session =
    await mongoose.startSession();

  try {
    session.startTransaction();

    const wire =
      await WireTransfer.findById(
        wireId,
        null,
        { session }
      );

    if (!wire) {
      throw new Error(
        "Wire transfer not found."
      );
    }

    if (wire.status !== "PENDING") {
      throw new Error(
        "Only pending wire transfers can be approved."
      );
    }

    await updateWireStatus({
      wireId: wire._id.toString(),

      status: "APPROVED",

      changedBy:
        new mongoose.Types.ObjectId(
          adminId
        ),

      actorType: "ADMIN",

      note: "Wire approved.",

      session,
    });

    if (wire.transactionReference) {
      await updateTransactionStatus({
        reference:
          wire.transactionReference,

        status: "PROCESSING",

        session,
      });
    }

    await createNotification({
      user: wire.userId.toString(),

      title:
        "Wire Transfer Approved",

      message:
        "Your wire transfer has been approved and will be processed shortly.",

      type: "SUCCESS",

      actionUrl: `/dashboard/wires/${wire._id}`,

      session,
    });

    await session.commitTransaction();

    return {
      success: true,
    };
  } catch (error) {
    await session.abortTransaction();

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to approve wire.",
    };
  } finally {
    session.endSession();
  }
}