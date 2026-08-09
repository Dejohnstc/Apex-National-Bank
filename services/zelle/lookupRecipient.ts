import dbConnect from "@/lib/db/connect";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";

interface RecipientLookupResult {
  success: boolean;
  message?: string;

  recipient?: {
    id: string;
    fullName: string;
    email: string;

    accountId: string;
    accountNumber: string;
    accountType: string;
  };
}

export async function lookupRecipient(
  email: string
): Promise<RecipientLookupResult> {
  await dbConnect();

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    return {
      success: false,
      message: "Recipient not found.",
    };
  }

  const account = await Account.findOne({
    user: user._id,
    status: "ACTIVE",
  });

  if (!account) {
    return {
      success: false,
      message:
        "Recipient does not have an active account.",
    };
  }

  return {
    success: true,

    recipient: {
      id: user._id.toString(),

      fullName: `${user.firstName} ${user.lastName}`,

      email: user.email,

      accountId: account._id.toString(),

      accountNumber: account.accountNumber,

      accountType:
        account.nickname ||
        `${account.type} Account`,
    },
  };
}