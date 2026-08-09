import dbConnect from "@/lib/db/connect";

import { Transaction } from "@/models/transaction/Transaction";

import type { AdminTransaction } from "@/types/admin/transaction.types";

export async function getTransaction(
  id: string
) {
  await dbConnect();

  const transaction =
    await Transaction.findById(id)
      .populate(
        "user",
        "firstName lastName"
      )
      .populate(
        "account",
        "accountNumber"
      );

  if (!transaction) {
    return {
      success: false,
      data: null,
    };
  }

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

const user =
  transaction.user as unknown as PopulatedUser | null;

const account =
  transaction.account as unknown as PopulatedAccount | null;

const data: AdminTransaction = {
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
  return {
    success: true,
    data,
  };
}