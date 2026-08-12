import { connectDB } from "@/lib/db/mongodb";

import ScheduledTransfer from "@/models/transfer/ScheduledTransfer";

import { executeScheduledTransfer } from "@/services/transfer/executeScheduledTransfer";

export async function processDueScheduledTransfers() {
  await connectDB();

  const now = new Date();

  const transfers =
    await ScheduledTransfer.find({
      status: "SCHEDULED",
      nextRunAt: {
        $lte: now,
      },
    })
      .select("_id")
      .lean();

  const results = [];

  for (const transfer of transfers) {
    try {
      const result =
        await executeScheduledTransfer(
          transfer._id.toString()
        );

      results.push({
        id: transfer._id.toString(),
        success: true,
        reference: result.reference,
      });
    } catch (error) {
      results.push({
        id: transfer._id.toString(),
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Scheduled transfer failed.",
      });
    }
  }

  return {
    processed: results.length,
    results,
  };
}