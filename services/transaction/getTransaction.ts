import type { Transaction as TransactionType } from "@/types";

import connectDB from "@/lib/db/connect";
import { Transaction } from "@/models/transaction/Transaction";

export async function getTransaction(
  id: string,
  userId: string
): Promise<TransactionType | null> {
  await connectDB();

  const transaction = await Transaction.findOne({
    _id: id,
    user: userId,
  }).lean();

  if (!transaction) {
    return null;
  }

  return {
    ...transaction,

    _id: transaction._id.toString(),

    user: transaction.user.toString(),

    account: transaction.account.toString(),
  } as TransactionType;
}