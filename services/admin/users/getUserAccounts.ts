import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";

export async function getUserAccounts(userId: string) {
  await dbConnect();

  const accounts = await Account.find({
    userId,
  })
    .sort({
      createdAt: -1,
    })
    .lean();

  return accounts.map((account) => ({
    id: account._id.toString(),

    accountNumber: account.accountNumber,

    routingNumber: account.routingNumber,

    accountType: account.accountType,

    status: account.status,

    currentBalance: account.currentBalance,

    availableBalance: account.availableBalance,

    createdAt: account.createdAt.toISOString(),
  }));
}