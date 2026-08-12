import dbConnect from "@/lib/db/connect";

import BillPayment from "@/models/BillPayment";

export async function getAdminBillPayments() {
  await dbConnect();

  return BillPayment.find({})
    .populate(
      "user",
      "customerId firstName lastName email"
    )
    .populate(
      "account",
      "accountNumber type nickname currency"
    )
    .sort({
      createdAt: -1,
    })
    .lean();
}