import dbConnect from "@/lib/db/connect";

import Loan from "@/models/Loan";

export async function rejectLoan(
  id: string
) {
  await dbConnect();

  return Loan.findByIdAndUpdate(
    id,
    {
      status: "REJECTED",
    },
    {
      new: true,
    }
  );
}