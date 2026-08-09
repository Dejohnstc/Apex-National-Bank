import connectDB from "@/lib/db/connect";

import { Account } from "@/models/account/Account";

export async function updateBalance(
  accountId: string,
  amount: number
) {
  await connectDB();

  const account =
    await Account.findById(accountId);

  if (!account) {
    throw new Error("Account not found");
  }

  account.currentBalance += amount;
  account.availableBalance += amount;

  await account.save();

  return account;
}