import mongoose from "mongoose";

import dbConnect from "@/lib/db/connect";
import { auth } from "@/lib/auth/auth";

import AchTransfer from "@/models/ach/AchTransfer";
import { createNotification } from "@/services/notification/createNotification";
import { updateAchStatus } from "./updateAchStatus";
import { updateTransactionStatus } from "@/services/transaction/updateTransactionStatus";

export async function completeTransfer(
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

    const transfer = await AchTransfer.findOne({
      reference,
    }).session(session);

    if (!transfer) {
      throw new Error("ACH transfer not found.");
    }

    if (transfer.status !== "PROCESSING") {
      throw new Error(
        "Only processing ACH transfers can be completed."
      );
    }

    const updatedTransfer =
      await updateAchStatus({
        reference,

        newStatus: "COMPLETED",

        changedBy: authSession.user.id,

        actorType: "ADMIN",

        note: "ACH transfer completed.",

        session,
      });

    await updateTransactionStatus({
      reference,

      status: "COMPLETED",

      postedAt: new Date(),

      session,
    });

    await createNotification({
  user: transfer.requester.toString(),

  title: "ACH Transfer Completed",

  message: `Your ACH transfer of $${transfer.amount.toFixed(
    2
  )} has been completed.`,

  type: "SUCCESS",

  actionUrl: `/dashboard/transfers/${transfer.reference}`,

  session,
});

    await session.commitTransaction();

    return {
      success: true,
      transfer: updatedTransfer,
    };
  } catch (error) {
    await session.abortTransaction();

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to complete ACH transfer.",
    };
  } finally {
    await session.endSession();
  }
}