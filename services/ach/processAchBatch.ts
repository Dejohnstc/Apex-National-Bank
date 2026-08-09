import mongoose from "mongoose";

import dbConnect from "@/lib/db/connect";

import AchTransfer from "@/models/ach/AchTransfer";

import { updateAchStatus } from "./updateAchStatus";

export async function processAchBatch() {
  await dbConnect();

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const now = new Date();

    const transfers = await AchTransfer.find({
      status: "PENDING",
      effectiveDate: {
        $lte: now,
      },
    }).session(session);

    let processed = 0;

    for (const transfer of transfers) {
      await updateAchStatus({
        reference: transfer.reference,

        newStatus: "PROCESSING",

        changedBy: "SYSTEM",

        actorType: "SYSTEM",

        note: "Automatically moved to processing.",

        session,
      });

      processed++;
    }

    await session.commitTransaction();

    return {
      success: true,
      processed,
    };
  } catch (error) {
    await session.abortTransaction();

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Batch processing failed.",
    };
  } finally {
    await session.endSession();
  }
}