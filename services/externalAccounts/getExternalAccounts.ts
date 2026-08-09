import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import ExternalAccount from "@/models/externalAccount/ExternalAccount";

export async function getExternalAccounts() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  await dbConnect();

  const accounts = await ExternalAccount.find({
    user: session.user.id,
  })
    .select(
  `
  nickname
  accountHolderName
  bankName
  routingNumber
  accountNumber
  accountType
  isDefault
  verified
  `
)
.select("+accountNumber")
    .sort({
      isDefault: -1,
      createdAt: -1,
    })
    .lean();

  return accounts.map((account) => ({
    ...account,
    _id: account._id.toString(),
  }));
}