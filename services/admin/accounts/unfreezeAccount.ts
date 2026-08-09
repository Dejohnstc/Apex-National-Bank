import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";

export async function unfreezeAccount(
  id: string
) {
  await dbConnect();

  await Account.findByIdAndUpdate(id, {
    status: "ACTIVE",
  });

  return {
    success: true,
  };
}