import { ClientSession } from "mongoose";
import type {
  TransactionType,
  Currency,
} from "@/types";
import { Transaction } from "@/models/transaction/Transaction";

interface CreateTransactionInput {
  account: string;

  user: string;

  reference: string;

  type: TransactionType;

  direction: "DEBIT" | "CREDIT";

  amount: number;

  fee?: number;

  status?:
    | "PENDING"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
    | "REJECTED"
    | "RETURNED";

  balanceBefore: number;

  balanceAfter: number;

  description: string;

  merchant?: string;

  category?: string;

  counterpartyName?: string;

  counterpartyAccount?: string;

  memo?: string;

  postedAt?: Date;

  session?: ClientSession;
}

export async function createTransaction(
  input: CreateTransactionInput
) {
  const transaction = {
    account: input.account,

    user: input.user,

    reference: input.reference,

    type: input.type,

    direction: input.direction,

    status: input.status ?? "COMPLETED",

    amount: input.amount,

    fee: input.fee ?? 0,

    balanceBefore: input.balanceBefore,

    balanceAfter: input.balanceAfter,

    merchant: input.merchant ?? "",

    description: input.description,

    category: input.category ?? "",

    location: "",

    counterpartyName:
      input.counterpartyName ?? "",

    counterpartyAccount:
      input.counterpartyAccount ?? "",

    memo: input.memo ?? "",

    currency: "USD" as Currency,

    postedAt:
      input.postedAt ?? new Date(),
  };

 if (input.session) {
  const created = new Transaction(transaction);

  await created.save({
    session: input.session,
  });

  return created;
}

return Transaction.create(transaction);
  }

  