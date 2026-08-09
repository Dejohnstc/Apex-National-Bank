import { Account } from "@/models/account/Account";

export async function findAccountById(
  accountId: string
) {
  return Account.findById(accountId);
}