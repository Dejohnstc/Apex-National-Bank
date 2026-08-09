import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";

export async function closeAccount(
  id: string
) {
  await dbConnect();

  await Account.findByIdAndUpdate(id, {
    status: "CLOSED",
  });

  return {
    success: true,
  };
}