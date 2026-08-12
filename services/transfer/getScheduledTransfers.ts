import { connectDB } from "@/lib/db/mongodb";

import ScheduledTransfer from "@/models/transfer/ScheduledTransfer";

export async function getScheduledTransfers(
  userId: string
) {
  await connectDB();

  const transfers =
    await ScheduledTransfer.find({
      user: userId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

  return transfers;
}