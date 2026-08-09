import { connectDB } from "@/lib/db/mongodb";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";

export async function getProfile(
  userId: string
) {
  await connectDB();

  const profile = await User.findById(userId)
    .select(
      [
        "firstName",
        "lastName",
        "email",
        "phone",
        "dateOfBirth",
        "occupation",
        "maritalStatus",
        "address",
        "city",
        "state",
        "postalCode",
        "country",
        "customerId",
        "kycStatus",
        "avatar",
        "emailNotifications",
        "smsNotifications",
        "marketingEmails",
        "createdAt",
      ].join(" ")
    )
    .lean();

  if (!profile) {
    return null;
  }

  const account = await Account.findOne({
    user: profile._id,
    type: "CHECKING",
  }).lean();

  return {
    id: profile._id.toString(),

    firstName: profile.firstName,
    lastName: profile.lastName,

    email: profile.email,
    phone: profile.phone,

    customerId: profile.customerId,

    occupation: profile.occupation,
    maritalStatus: profile.maritalStatus,

    address: profile.address,
    city: profile.city,
    state: profile.state,
    postalCode: profile.postalCode,
    country: profile.country,

    avatar: profile.avatar,

    kycStatus: profile.kycStatus,

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

    availableBalance:
      account?.availableBalance ?? 0,

    currentBalance:
      account?.currentBalance ?? 0,

    openedAt: account?.openedAt
      ? account.openedAt.toISOString()
      : null,

    emailNotifications:
      profile.emailNotifications ?? true,

    smsNotifications:
      profile.smsNotifications ?? false,

    marketingEmails:
      profile.marketingEmails ?? false,

    dateOfBirth:
      profile.dateOfBirth
        ? profile.dateOfBirth.toISOString()
        : null,

    createdAt:
      profile.createdAt
        ? profile.createdAt.toISOString()
        : null,
  };
}