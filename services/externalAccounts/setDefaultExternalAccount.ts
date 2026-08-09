import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import ExternalAccount from "@/models/externalAccount/ExternalAccount";

export async function setDefaultExternalAccount(
  id: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  await dbConnect();

  await ExternalAccount.updateMany(
    {
      user: session.user.id,
    },
    {
      isDefault: false,
    }
  );

  await ExternalAccount.updateOne(
    {
      _id: id,
      user: session.user.id,
    },
    {
      isDefault: true,
    }
  );

  return {
    success: true,
  };
}