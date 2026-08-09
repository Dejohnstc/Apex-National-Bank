import { ClientSession } from "mongoose";

import connectDB from "@/lib/db/connect";

import { Account } from "@/models/account/Account";

import { generateAccountNumber } from "@/utils/generateAccountNumber";

import { BANK } from "@/config/bank";

import { AccountType } from "@/types";

interface CreateAccountInput {
  userId: string;

  type: AccountType;

  openingBalance?: number;

  nickname?: string;

  session?: ClientSession;
}

export async function createAccount({
  userId,
  type,
  openingBalance = 0,
  nickname = "",
  session,
}: CreateAccountInput) {
  await connectDB();

  const account = {
    user: userId,

    accountNumber: await generateAccountNumber(),

    routingNumber: BANK.ROUTING_NUMBER,

    nickname,

    type,

    currentBalance: openingBalance,

    availableBalance: openingBalance,
  };

  if (session) {
    const [createdAccount] = await Account.create([account], {
      session,
    });

    return createdAccount;
  }

  return Account.create(account);
}