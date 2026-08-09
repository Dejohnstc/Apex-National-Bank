import { ClientSession } from "mongoose";

import { Account } from "@/models/account/Account";

export async function creditAccount(
  accountId: string,
  amount: number,
  session: ClientSession
) {
  const account = await Account.findById(accountId).session(session);

  if (!account) {
    throw new Error("Account not found.");
  }

  if (account.status !== "ACTIVE") {
    throw new Error("Account is not active.");
  }

  const balanceBefore = account.availableBalance;

  account.availableBalance += amount;
  account.currentBalance += amount;

  await account.save({ session });

  return {
    account,
    balanceBefore,
    balanceAfter: account.availableBalance,
  };
}