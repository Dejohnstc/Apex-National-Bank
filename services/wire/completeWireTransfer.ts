import mongoose from "mongoose";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import WireTransfer from "@/models/wire/WireTransfer";

import { createNotification } from "@/services/notification/createNotification";
import { updateTransactionStatus } from "@/services/transaction/updateTransactionStatus";

import { updateWireStatus } from "./updateWireStatus";

export async function completeWireTransfer(
  reference: string
) {
  await dbConnect();

  const authSession = await auth();

  if (!authSession?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const wire = await WireTransfer.findOne(
      {
        reference,
      },
      null,
      { session }
    );

    if (!wire) {
      throw new Error(
        "Wire transfer not found."
      );
    }

    if (
      wire.status !== "APPROVED" &&
      wire.status !== "PROCESSING"
    ) {
      throw new Error(
        "Only approved or processing wire transfers can be completed."
      );
    }

    // Move into processing first (if needed)
    if (wire.status === "APPROVED") {
      await updateWireStatus({
        wireId: wire._id.toString(),

        status: "PROCESSING",

        changedBy:
          new mongoose.Types.ObjectId(
            authSession.user.id
          ),

        actorType: "ADMIN",

        note: "Wire processing started.",

        session,
      });

      if (!wire.transactionReference) {
  throw new Error(
    "Wire transfer is missing its transaction reference."
  );
}

await updateTransactionStatus({
  reference: wire.transactionReference,

  status: "PROCESSING",

  session,
});
    }

    // Complete the wire
    const updatedWire =
      await updateWireStatus({
        wireId: wire._id.toString(),

        status: "COMPLETED",

        changedBy:
          new mongoose.Types.ObjectId(
            authSession.user.id
          ),

        actorType: "ADMIN",

        note: "Wire transfer completed.",

        session,
      });

   if (!wire.transactionReference) {
  throw new Error(
    "Wire transfer is missing its transaction reference."
  );
}

await updateTransactionStatus({
  reference: wire.transactionReference,

  status: "COMPLETED",

  postedAt: new Date(),

  session,
});

    await createNotification({
      user: wire.userId.toString(),

      title: "Wire Transfer Completed",

      message: `Your wire transfer of $${wire.amount.toFixed(
        2
      )} has been completed successfully.`,

      type: "SUCCESS",

      actionUrl: `/dashboard/wires/${wire.reference}`,

      session,
    });

    await session.commitTransaction();

    return {
      success: true,

      wire: updatedWire,
    };
  } catch (error) {
    await session.abortTransaction();

    return {
      success: false,

      error:
        error instanceof Error
          ? error.message
          : "Failed to complete wire transfer.",
    };
  } finally {
    await session.endSession();
  }
}