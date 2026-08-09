import connectDB from "@/lib/db/connect";

import { Account } from "@/models/account/Account";

import type { Account as AccountType } from "@/types/account";

export async function getAccount(
  id: string,
  userId: string
): Promise<AccountType | null> {
  await connectDB();

  const account = await Account.findOne({
    _id: id,
    user: userId,
  }).lean();

  if (!account) {
    return null;
  }

  return {
    _id: account._id.toString(),
    user: account.user.toString(),
    accountNumber: account.accountNumber,
    routingNumber: account.routingNumber,
    nickname: account.nickname,
    type: account.type,
    status: account.status,
    currency: account.currency,
    availableBalance: account.availableBalance,
    currentBalance: account.currentBalance,
    interestRate: account.interestRate,
    overdraftLimit: account.overdraftLimit,
    openedAt: account.openedAt.toISOString(),
    createdAt: account.createdAt.toISOString(),
    updatedAt: account.updatedAt.toISOString(),
  };
}