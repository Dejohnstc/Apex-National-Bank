import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import ExternalAccount from "@/models/externalAccount/ExternalAccount";

export async function getExternalAccount(
  id: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  await dbConnect();

  return ExternalAccount.findOne({
    _id: id,
    user: session.user.id,
  }).select("+accountNumber");
}