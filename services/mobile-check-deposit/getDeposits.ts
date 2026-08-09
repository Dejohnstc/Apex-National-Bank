import dbConnect from "@/lib/db/connect";

import CheckDeposit from "@/models/CheckDeposit";

interface GetDepositsOptions {
  userId: string;
}

export async function getDeposits({
  userId,
}: GetDepositsOptions) {
  await dbConnect();

  return CheckDeposit.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .lean();
}