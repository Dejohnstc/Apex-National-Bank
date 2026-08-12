import dbConnect from "@/lib/db/connect";

import CheckDeposit from "@/models/CheckDeposit";

interface GetDepositOptions {
  userId: string;
  depositId: string;
}

export async function getDeposit({
  userId,
  depositId,
}: GetDepositOptions) {
  await dbConnect();

  const deposit =
    await CheckDeposit.findOne({
      _id: depositId,
      user: userId,
    }).lean();

  if (!deposit) {
    throw new Error(
      "Deposit not found."
    );
  }

  return deposit;
}