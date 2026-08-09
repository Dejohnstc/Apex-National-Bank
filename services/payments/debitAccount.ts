import { ClientSession } from "mongoose";

import { Account } from "@/models/account/Account";

export async function debitAccount(
  accountId: string,
  amount: number,
  session?: ClientSession
) {
  const account = await Account.findById(
    accountId,
    null,
    session ? { session } : undefined
  );

  if (!account) {
    throw new Error("Account not found");
  }

  const balanceBefore =
    account.availableBalance;

  if (balanceBefore < amount) {
    throw new Error("Insufficient funds");
  }

  account.availableBalance -= amount;

  // Keep current balance in sync
  account.currentBalance -= amount;

  await account.save({
  session,
});
  return {
    account,
    balanceBefore,
    balanceAfter:
      account.availableBalance,
  };
}