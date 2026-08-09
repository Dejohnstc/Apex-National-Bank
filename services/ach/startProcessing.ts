import mongoose from "mongoose";

import dbConnect from "@/lib/db/connect";
import { auth } from "@/lib/auth/auth";

import AchTransfer from "@/models/ach/AchTransfer";

import { updateAchStatus } from "./updateAchStatus";

export async function startProcessing(
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

    if (transfer.status !== "PENDING") {
      throw new Error(
        "Only pending ACH transfers can be processed."
      );
    }

    const updatedTransfer =
      await updateAchStatus({
        reference,

        newStatus: "PROCESSING",

        changedBy: authSession.user.id,

        actorType: "ADMIN",

        note: "ACH processing started.",

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
          : "Failed to start ACH processing.",
    };
  } finally {
    await session.endSession();
  }
}