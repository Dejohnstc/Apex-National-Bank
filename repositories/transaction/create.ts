import { ClientSession } from "mongoose";

import { Transaction } from "@/models/transaction/Transaction";

interface CreateTransactionRepositoryInput {
  user: string;
  account: string;
  reference: string;
  type: string;
  direction: string;
  status: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
}

export async function createTransactionRecord(
  data: CreateTransactionRepositoryInput,
  session: ClientSession
) {
  return Transaction.create(
    [data],
    { session }
  );
}