import connectDB from "@/lib/db/connect";

import { Transaction } from "@/models/transaction/Transaction";

import type {
  TransactionDirection,
  TransactionStatus,
  TransactionType,
} from "@/types/transaction";

import type { Currency } from "@/types/account";

export interface GetTransactionsParams {
  accountId: string;
}

export interface TransactionListItem {
  _id: string;

  account: string;

  reference: string;

  description: string;

  amount: number;

  type: TransactionType;

  status: TransactionStatus;

  direction: TransactionDirection;

  category?: string;

  merchant?: string;

  counterpartyName?: string;

  counterpartyAccount?: string;

  fee: number;

  currency: Currency;

  balanceBefore: number;

  balanceAfter: number;

  location?: string;

  memo?: string;

  postedAt: string;

  createdAt: string;
}

export async function getTransactions({
  accountId,
}: GetTransactionsParams): Promise<TransactionListItem[]> {
  await connectDB();

  const transactions = await Transaction.find({
    account: accountId,
  })
    .sort({
      postedAt: -1,
    })
    .lean();

  return transactions.map((transaction) => ({
  _id: transaction._id.toString(),

  account: transaction.account.toString(),

  reference: transaction.reference,

  description: transaction.description,

  amount: transaction.amount,

  type:
    transaction.type as TransactionType,

  status:
    transaction.status as TransactionStatus,

  direction:
    transaction.direction as TransactionDirection,

  category: transaction.category,

  merchant: transaction.merchant,

  counterpartyName:
    transaction.counterpartyName,

  counterpartyAccount:
    transaction.counterpartyAccount,

  fee: transaction.fee,

  currency:
    transaction.currency as Currency,

  balanceBefore:
    transaction.balanceBefore,

  balanceAfter:
    transaction.balanceAfter,

  location: transaction.location,

  memo: transaction.memo,

  postedAt:
    transaction.postedAt.toISOString(),

  createdAt:
    transaction.createdAt.toISOString(),
}));
}