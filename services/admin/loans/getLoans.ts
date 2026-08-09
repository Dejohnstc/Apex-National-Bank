import type { SortOrder } from "mongoose";

import dbConnect from "@/lib/db/connect";

import Loan from "@/models/Loan";

import type {
  AdminLoan,
  GetLoansParams,
  GetLoansResponse,
} from "./types";

export async function getLoans(
  params: GetLoansParams = {}
): Promise<GetLoansResponse> {
  await dbConnect();

  const page = params.page ?? 1;
  const limit = 10;

  const query: Record<
    string,
    unknown
  > = {};

  if (params.status) {
    query.status = params.status;
  }

  if (params.type) {
    query.type = params.type;
  }

  if (params.search) {
    query.loanNumber = {
      $regex: params.search,
      $options: "i",
    };
  }

  const sort: Record<
    string,
    SortOrder
  > = {
    createdAt:
      params.sort === "oldest"
        ? 1
        : -1,
  };

  const total =
    await Loan.countDocuments(query);

  type LeanLoan = {
    _id: {
      toString(): string;
    };

    userId: {
      toString(): string;
    };

    accountId: {
      toString(): string;
    };

    loanNumber: string;

    type: AdminLoan["type"];

    principal: number;

    interestRate: number;

    termMonths: number;

    monthlyPayment: number;

    remainingBalance: number;

    startDate?: Date;

    maturityDate?: Date;

    status: AdminLoan["status"];

    createdAt: Date;

    updatedAt: Date;
  };

  const raw =
    (await Loan.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()) as unknown as LeanLoan[];

  const data: AdminLoan[] =
    raw.map((loan) => ({
      id: loan._id.toString(),

      userId:
        loan.userId.toString(),

      accountId:
        loan.accountId.toString(),

      loanNumber:
        loan.loanNumber,

      type: loan.type,

      principal:
        loan.principal,

      interestRate:
        loan.interestRate,

      termMonths:
        loan.termMonths,

      monthlyPayment:
        loan.monthlyPayment,

      remainingBalance:
        loan.remainingBalance,

      startDate:
        loan.startDate,

      maturityDate:
        loan.maturityDate,

      status:
        loan.status,

      createdAt:
        loan.createdAt,

      updatedAt:
        loan.updatedAt,
    }));

  const [
    activeLoans,
    pendingLoans,
    paidLoans,
    defaultedLoans,
  ] = await Promise.all([
    Loan.countDocuments({
      status: "ACTIVE",
    }),

    Loan.countDocuments({
      status: "PENDING",
    }),

    Loan.countDocuments({
      status: "PAID",
    }),

    Loan.countDocuments({
      status: "DEFAULTED",
    }),
  ]);

  return {
    data,

    summary: {
      totalLoans: total,

      activeLoans,

      pendingLoans,

      paidLoans,

      defaultedLoans,
    },

    pagination: {
      page,

      limit,

      total,

      totalPages: Math.ceil(
        total / limit
      ),
    },
  };
}