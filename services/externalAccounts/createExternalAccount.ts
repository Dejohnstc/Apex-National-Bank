import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import ExternalAccount from "@/models/externalAccount/ExternalAccount";

interface Input {
  nickname: string;
  accountHolderName: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: "CHECKING" | "SAVINGS";
}

export async function createExternalAccount(
  input: Input
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  await dbConnect();

  const count =
    await ExternalAccount.countDocuments({
      user: session.user.id,
    });

  await ExternalAccount.create({
    user: session.user.id,
    ...input,
    isDefault: count === 0,
  });

  return {
    success: true,
  };
}