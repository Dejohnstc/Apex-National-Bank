import dbConnect from "@/lib/db/connect";

import Loan from "@/models/Loan";

import type { AdminLoan } from "./types";

export async function getLoan(
  id: string
): Promise<AdminLoan | null> {
  await dbConnect();

  const loan = await Loan.findById(id).lean();

  if (!loan) {
    return null;
  }

  return {
    id: loan._id.toString(),

    userId: loan.userId.toString(),

    accountId: loan.accountId.toString(),

    loanNumber: loan.loanNumber,

    type: loan.type,

    principal: loan.principal,

    interestRate: loan.interestRate,

    termMonths: loan.termMonths,

    monthlyPayment: loan.monthlyPayment,

    remainingBalance: loan.remainingBalance,

    startDate: loan.startDate,

    maturityDate: loan.maturityDate,

    status: loan.status,

    createdAt: loan.createdAt,

    updatedAt: loan.updatedAt,
  };
}