import dbConnect from "@/lib/db/connect";

import Loan from "@/models/Loan";

export async function approveLoan(
  id: string
) {
  await dbConnect();

  return Loan.findByIdAndUpdate(
    id,
    {
      status: "ACTIVE",
      startDate: new Date(),
    },
    {
      new: true,
    }
  );
}