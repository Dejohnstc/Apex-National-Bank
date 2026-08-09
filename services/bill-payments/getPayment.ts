import dbConnect from "@/lib/db/connect";

import BillPayment from "@/models/BillPayment";

interface GetPaymentsOptions {
  userId: string;
}

export async function getPayments({
  userId,
}: GetPaymentsOptions) {
  await dbConnect();

  const payments =
    await BillPayment.find({
      user: userId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

  return payments;
}