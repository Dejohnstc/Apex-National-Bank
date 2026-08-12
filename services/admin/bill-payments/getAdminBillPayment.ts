import dbConnect from "@/lib/db/connect";

import BillPayment from "@/models/BillPayment";

export async function getAdminBillPayment(
  paymentId: string
) {
  await dbConnect();

  const payment =
    await BillPayment.findById(
      paymentId
    )
      .populate(
        "user",
        "customerId firstName lastName email phone"
      )
      .populate(
        "account",
        "accountNumber type nickname currency currentBalance availableBalance"
      )
      .lean();

  if (!payment) {
    throw new Error(
      "Bill payment not found."
    );
  }

  return payment;
}