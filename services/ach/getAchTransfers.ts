import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import AchTransfer from "@/models/ach/AchTransfer";

export async function getAchTransfers() {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  const transfers = await AchTransfer.find({
    requester: session.user.id,
  })
    .select(`
      reference
      recipientName
      recipientBank
      amount
      status
      direction
      createdAt
      effectiveDate
      postedDate
    `)
    .sort({
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(transfers));
}