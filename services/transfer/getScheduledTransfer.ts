import { connectDB } from "@/lib/db/mongodb";

import ScheduledTransfer from "@/models/transfer/ScheduledTransfer";

export async function getScheduledTransfer(
  userId: string,
  transferId: string
) {
  await connectDB();

  const transfer =
    await ScheduledTransfer.findOne({
      _id: transferId,
      user: userId,
    })
      .populate(
        "fromAccount",
        "nickname accountNumber type currency"
      )
      .populate(
        "toAccount",
        "nickname accountNumber type currency"
      )
      .lean();

  if (!transfer) {
    return null;
  }

  return transfer;
}