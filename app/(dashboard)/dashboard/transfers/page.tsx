import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { Account } from "@/models/account/Account";
import { Transaction } from "@/models/transaction/Transaction";

import TransfersPageClient from "@/components/transfers/TransfersPageClient";

import { getScheduledTransfers } from "@/services/transfer/getScheduledTransfers";

import type {
  TransactionType,
  TransactionDirection,
  TransactionStatus,
} from "@/types";

export default async function TransfersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  /*
   * Load active customer accounts.
   */
  const accounts = await Account.find({
    user: userId,
    status: "ACTIVE",
  })
    .sort({ createdAt: 1 })
    .lean();

  /*
   * Load internal transfer history.
   */
  const transfers = await Transaction.find({
    user: userId,
    type: "TRANSFER",
  })
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  /*
   * Load scheduled transfers.
   */
  const scheduledTransfers =
    await getScheduledTransfers(userId);

  /*
   * Serialize accounts.
   */
  const serializedAccounts =
    accounts.map((account) => ({
      _id: account._id.toString(),

      user: account.user.toString(),

      accountNumber:
        account.accountNumber,

      routingNumber:
        account.routingNumber,

      nickname:
        account.nickname ?? "",

      type:
        account.type,

      status:
        account.status,

      currency:
        account.currency,

      availableBalance:
        account.availableBalance ?? 0,

      currentBalance:
        account.currentBalance ?? 0,

      interestRate:
        account.interestRate ?? 0,

      overdraftLimit:
        account.overdraftLimit ?? 0,

      lastActivityAt:
        account.lastActivityAt ?? null,

      openedAt:
        account.openedAt ?? null,

      createdAt:
        account.createdAt ?? null,

      updatedAt:
        account.updatedAt ?? null,
    }));

  /*
   * Keep Transaction-compatible values.
   *
   * Dates remain Date objects instead of being
   * converted to strings.
   */
  const serializedTransfers =
    transfers.map((transfer) => ({
      _id:
        transfer._id.toString(),

      account:
        transfer.account.toString(),

      user:
        transfer.user.toString(),

      reference:
        transfer.reference,

      type:
        transfer.type as TransactionType,

      direction:
        transfer.direction as TransactionDirection,

      status:
        transfer.status as TransactionStatus,

      amount:
        transfer.amount,

      balanceBefore:
        transfer.balanceBefore,

      balanceAfter:
        transfer.balanceAfter,

      merchant:
        transfer.merchant ?? "",

      description:
        transfer.description ?? "",

      category:
        transfer.category ?? "",

      location:
        transfer.location ?? "",

      counterpartyAccount:
        transfer.counterpartyAccount ?? "",

      counterpartyName:
        transfer.counterpartyName ?? "",

      memo:
        transfer.memo ?? "",

      currency:
        transfer.currency,

      fee:
        transfer.fee ?? 0,

      postedAt:
        transfer.postedAt,

      createdAt:
        transfer.createdAt,

      updatedAt:
        transfer.updatedAt,
    }));

  return (
    <TransfersPageClient
      accounts={
        serializedAccounts
      }
      transfers={
        serializedTransfers
      }
      scheduledTransfers={
        scheduledTransfers
      }
    />
  );
}