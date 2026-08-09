import { ClientSession } from "mongoose";

import { createAccount } from "./createAccount";

export async function provisionAccounts(
  userId: string,
  session?: ClientSession
) {
  const checking = await createAccount({
    userId,
    type: "CHECKING",
    nickname: "Primary Checking",
    session,
  });

  const savings = await createAccount({
    userId,
    type: "SAVINGS",
    nickname: "Primary Savings",
    session,
  });

  return {
    checking,
    savings,
  };
}