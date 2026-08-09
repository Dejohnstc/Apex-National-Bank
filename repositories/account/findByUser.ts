import { Account } from "@/models/account/Account";

export async function findAccountsByUser(
  userId: string
) {
  return Account.find({
    user: userId,
  }).sort({
    createdAt: 1,
  });
}