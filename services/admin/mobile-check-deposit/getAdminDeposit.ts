import dbConnect from "@/lib/db/connect";

import CheckDeposit from "@/models/CheckDeposit";

export async function getAdminDeposit(
  depositId: string
) {
  await dbConnect();

  const deposit =
    await CheckDeposit.findById(
      depositId
    )
      .populate(
        "user",
        "customerId firstName lastName email phone"
      )
      .populate(
        "account",
        "accountNumber type nickname currency currentBalance availableBalance"
      )
      .populate(
        "reviewedBy",
        "firstName lastName email"
      )
      .populate(
        "fundsReleasedBy",
        "firstName lastName email"
      )
      .lean();

  if (!deposit) {
    throw new Error(
      "Check deposit not found."
    );
  }

  return deposit;
}