import dbConnect from "@/lib/db/connect";

import Loan from "@/models/Loan";

export async function markLoanPaid(
  id: string
) {
  await dbConnect();

  return Loan.findByIdAndUpdate(
    id,
    {
      status: "PAID",
      remainingBalance: 0,
    },
    {
      new: true,
    }
  );
}