import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import AchTransfer from "@/models/ach/AchTransfer";

export async function getAchTransferByReference(
  reference: string
) {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const transfer = await AchTransfer.findOne({
    requester: session.user.id,
    reference,
  }).lean();

  if (!transfer) {
    return null;
  }

  return JSON.parse(JSON.stringify(transfer));
}