import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";

import type { AdminAccount } from "@/types/admin/account.types";

export async function getAccount(
  id: string
) {
  await dbConnect();

  const account =
    await Account.findById(id)
      .populate(
        "user",
        "firstName lastName customerId"
      )
      .lean();

  if (!account) {
    return {
      success: false,
      data: null,
    };
  }

  const data: AdminAccount = {
    id: account._id.toString(),

    userId:
      account.user?._id?.toString() ?? "",

    customerName: account.user
      ? `${account.user.firstName} ${account.user.lastName}`
      : "Unknown",

    accountNumber:
      account.accountNumber,

    routingNumber:
      account.routingNumber,

    nickname: account.nickname,

    type: account.type,

    status: account.status,

    currency: account.currency,

    availableBalance:
      account.availableBalance,

    currentBalance:
      account.currentBalance,

    interestRate:
      account.interestRate,

    overdraftLimit:
      account.overdraftLimit,

    openedAt: account.openedAt
    ? account.openedAt.toISOString()
    : null,

  lastActivityAt: account.lastActivityAt
    ? account.lastActivityAt.toISOString()
    : null,

  createdAt: account.createdAt
    ? account.createdAt.toISOString()
    : null,
  };

  return {
    success: true,
    data,
  };
}