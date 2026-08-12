import dbConnect from "@/lib/db/connect";

import CheckDeposit from "@/models/CheckDeposit";

export async function getAdminDeposits() {
  await dbConnect();

  return CheckDeposit.find({})
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