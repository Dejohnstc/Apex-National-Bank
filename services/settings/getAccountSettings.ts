import { connectDB } from "@/lib/db/mongodb";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";

export async function getAccountSettings(
  userId: string
) {
  await connectDB();

  const user = await User.findById(
    userId
  )
    .select(
      "customerId firstName lastName email phone kycStatus"
    )
    .lean();

  if (!user) {
    return null;
  }

  const account = await Account.findOne({
    user: user._id,
    type: "CHECKING",
  })
    .select(
      "accountNumber routingNumber type status currency openedAt"
    )
    .lean();

  return {
    customerId:
      user.customerId ?? "",

    firstName:
      user.firstName,

    lastName:
      user.lastName,

    email:
      user.email,

    phone:
      user.phone,

    kycStatus:
      user.kycStatus ?? "",

    accountNumber:
      account?.accountNumber ?? "",

    routingNumber:
      account?.routingNumber ?? "",

    accountType:
      account?.type ?? "",

    accountStatus:
      account?.status ?? "",

    currency:
      account?.currency ?? "USD",

    openedAt:
      account?.openedAt
        ? account.openedAt.toISOString()
        : null,
  };
}