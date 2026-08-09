import { ClientSession } from "mongoose";

import { Transaction } from "@/models/transaction/Transaction";

import {
  Currency,
  TransactionDirection,
  TransactionStatus,
  TransactionType,
} from "@/types";

interface TransactionMetadata {
  [key: string]: unknown;

  merchant?: string;
  category?: string;
  location?: string;

  counterpartyAccount?: string;
  counterpartyName?: string;

  memo?: string;

  transferId?: string;
  externalReference?: string;

  ipAddress?: string;
  device?: string;
}

interface CreateTransactionInput {
  user: string;
  account: string;

  reference: string;

  type: TransactionType;
  direction: TransactionDirection;

  amount: number;

  balanceBefore: number;
  balanceAfter: number;

  description: string;

  status?: TransactionStatus;

  currency?: Currency;

  fee?: number;

  /**
   * Date the transaction is officially posted.
   * Defaults to the creation time.
   */
  postedAt?: Date;

  /**
   * Available balance after posting.
   * Defaults to balanceAfter.
   */
  availableBalance?: number;

  /**
   * Optional structured metadata.
   */
  metadata?: TransactionMetadata;

  /**
   * Legacy convenience fields.
   */
  merchant?: string;
  category?: string;
  location?: string;

  counterpartyAccount?: string;
  counterpartyName?: string;

  memo?: string;

  /**
   * Optional MongoDB transaction session.
   */
  session?: ClientSession;
}

export async function createTransaction({
  session,
  ...data
}: CreateTransactionInput) {
  const metadata: TransactionMetadata = {
    merchant: data.merchant,
    category: data.category,
    location: data.location,

    counterpartyAccount:
      data.counterpartyAccount,

    counterpartyName:
      data.counterpartyName,

    memo: data.memo,

    ...data.metadata,
  };

  const document = {
    ...data,

    status:
      data.status ?? "COMPLETED",

    currency:
      data.currency ?? "USD",

    fee:
      data.fee ?? 0,

    postedAt:
      data.postedAt ?? new Date(),

    availableBalance:
      data.availableBalance ??
      data.balanceAfter,

    metadata,
  };

  if (session) {
    const [transaction] =
      await Transaction.create(
        [document],
        { session }
      );

    return transaction;
  }

  return await Transaction.create(document);
}