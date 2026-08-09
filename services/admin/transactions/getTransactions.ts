import type { SortOrder } from "mongoose";

import dbConnect from "@/lib/db/connect";

import { Transaction } from "@/models/transaction/Transaction";

import type {
  AdminTransaction,
  GetTransactionsParams,
  GetTransactionsResponse,
} from "@/types/admin/transaction.types";

export async function getTransactions(
  params: GetTransactionsParams = {}
): Promise<GetTransactionsResponse> {
  await dbConnect();

  const {
    page = 1,
    limit = 20,
    search = "",
    status,
    type,
    direction,
    sort = "newest",
  } = params;

  const query: Record<string, unknown> = {};

  if (status) query.status = status;

  if (type) query.type = type;

  if (direction) query.direction = direction;

  if (search) {
    query.$or = [
      {
        reference: {
          $regex: search,
          $options: "i",
        },
      },
      {
        merchant: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const sortMap: Record<
    NonNullable<GetTransactionsParams["sort"]>,
    Record<string, SortOrder>
  > = {
    newest: {
      postedAt: -1,
    },

    oldest: {
      postedAt: 1,
    },

    highest: {
      amount: -1,
    },

    lowest: {
      amount: 1,
    },
  };

  const [transactions, total] =
    await Promise.all([
      Transaction.find(query)
        .populate(
          "user",
          "firstName lastName"
        )
        .populate(
          "account",
          "accountNumber"
        )
        .sort(sortMap[sort])
        .skip((page - 1) * limit)
        .limit(limit),

      Transaction.countDocuments(query),
    ]);

  type PopulatedUser = {
  _id: {
    toString(): string;
  };
  firstName: string;
  lastName: string;
};

type PopulatedAccount = {
  _id: {
    toString(): string;
  };
  accountNumber: string;
};

const data: AdminTransaction[] = transactions.map((transaction) => {
  const user = transaction.user as unknown as PopulatedUser | null;

  const account =
    transaction.account as unknown as PopulatedAccount | null;

  return {
    id: transaction.id,

    reference: transaction.reference,

    userId: user?._id.toString() ?? "",

    customerName: user
      ? `${user.firstName} ${user.lastName}`
      : "Unknown",

    accountId: account?._id.toString() ?? "",

    accountNumber: account?.accountNumber ?? "",

    type: transaction.type as AdminTransaction["type"],

    direction:
      transaction.direction as AdminTransaction["direction"],

    status:
      transaction.status as AdminTransaction["status"],

    amount: transaction.amount,

    fee: transaction.fee,

    currency: transaction.currency,

    balanceBefore: transaction.balanceBefore,

    balanceAfter: transaction.balanceAfter,

    merchant: transaction.merchant,

    description: transaction.description,

    category: transaction.category,

    counterpartyName:
      transaction.counterpartyName,

    counterpartyAccount:
      transaction.counterpartyAccount,

    location: transaction.location,

    memo: transaction.memo,

    postedAt: transaction.postedAt.toISOString(),

    createdAt: transaction.createdAt.toISOString(),
  };
});

  const summary = {
    totalTransactions: total,

    totalCredits: data
      .filter(
        (t) =>
          t.direction === "CREDIT"
      )
      .reduce(
        (sum, t) =>
          sum + t.amount,
        0
      ),

    totalDebits: data
      .filter(
        (t) =>
          t.direction === "DEBIT"
      )
      .reduce(
        (sum, t) =>
          sum + t.amount,
        0
      ),

    totalVolume: data.reduce(
      (sum, t) => sum + t.amount,
      0
    ),
  };

  return {
    success: true,

    summary,

    data,

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