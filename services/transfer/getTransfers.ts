import type { Transaction as TransactionType } from "@/types";

import connectDB from "@/lib/db/connect";
import { Transaction } from "@/models/transaction/Transaction";

export async function getTransfers(
  userId: string
): Promise<TransactionType[]> {
  await connectDB();

  const transfers = await Transaction.find({
    user: userId,
    type: "TRANSFER",
  })
    .sort({
      postedAt: -1,
    })
    .lean();

  return transfers.map((transfer) => ({
    ...transfer,
    _id: transfer._id.toString(),
    user: transfer.user.toString(),
    account: transfer.account.toString(),
  })) as TransactionType[];
}