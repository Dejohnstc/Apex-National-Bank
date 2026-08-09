import connectDB from "@/lib/db/connect";
import { Account } from "@/models/account/Account";
import type { Account as AccountType } from "@/types/account";

export async function getAccounts(
  userId: string
): Promise<AccountType[]> {
  await connectDB();

  const accounts = await Account.find({
    user: userId,
  })
    .sort({
      createdAt: 1,
    })
    .lean();

  return accounts.map((account) => ({
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
  }));
}