import { ClientSession } from "mongoose";

import { Transaction } from "@/models/transaction/Transaction";

import { TransactionStatus } from "@/types";

interface UpdateTransactionStatusInput {
  reference: string;

  status: TransactionStatus;

  postedAt?: Date;

  session?: ClientSession;
}

export async function updateTransactionStatus({
  reference,
  status,
  postedAt,
  session,
}: UpdateTransactionStatusInput) {
  const transaction =
    await Transaction.findOne(
      {
        reference,
      },
      null,
      session ? { session } : undefined
    );

  if (!transaction) {
    throw new Error(
      "Transaction not found."
    );
  }

  transaction.status = status;

  if (postedAt) {
    transaction.postedAt = postedAt;
  }

  await transaction.save({
    session,
  });

  return transaction;
}