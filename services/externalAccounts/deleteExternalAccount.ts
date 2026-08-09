import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import ExternalAccount from "@/models/externalAccount/ExternalAccount";

export async function deleteExternalAccount(
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

  await ExternalAccount.deleteOne({
    _id: id,
    user: session.user.id,
  });

  return {
    success: true,
  };
}