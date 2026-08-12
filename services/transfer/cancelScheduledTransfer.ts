import { connectDB } from "@/lib/db/mongodb";

import ScheduledTransfer from "@/models/transfer/ScheduledTransfer";

interface CancelScheduledTransferResult {
  success: true;
  message: string;
}

export async function cancelScheduledTransfer(
  userId: string,
  transferId: string
): Promise<CancelScheduledTransferResult> {
  await connectDB();

  const transfer =
    await ScheduledTransfer.findOne({
      _id: transferId,
      user: userId,
    });

  if (!transfer) {
    throw new Error(
      "Scheduled transfer not found."
    );
  }

  if (transfer.status !== "SCHEDULED") {
    throw new Error(
      "Only scheduled transfers can be cancelled."
    );
  }

  const now = new Date();

  transfer.status = "CANCELLED";
  transfer.nextRunAt = null;
  transfer.cancelledAt = now;

  await transfer.save();

  return {
    success: true,
    message:
      "Scheduled transfer cancelled successfully.",
  };
}