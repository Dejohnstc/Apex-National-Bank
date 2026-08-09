import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";

export async function freezeAccount(
  id: string
) {
  await dbConnect();

  await Account.findByIdAndUpdate(id, {
    status: "FROZEN",
  });

  return {
    success: true,
  };
}