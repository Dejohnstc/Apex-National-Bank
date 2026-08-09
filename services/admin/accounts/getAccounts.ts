import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";
import type { SortOrder } from "mongoose";
import type {
  AdminAccount,
  GetAccountsParams,
  GetAccountsResponse,
} from "@/types/admin/account.types";

export async function getAccounts(
  params: GetAccountsParams = {}
): Promise<GetAccountsResponse> {
  await dbConnect();

  const {
    page = 1,
    limit = 20,
    search = "",
    status,
    type,
    sort = "newest",
  } = params;

  const query: Record<string, unknown> = {};

  if (status) {
    query.status = status;
  }

  if (type) {
    query.type = type;
  }

  if (search) {
    query.$or = [
      {
        accountNumber: {
          $regex: search,
          $options: "i",
        },
      },
      {
        nickname: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

 const sortMap: Record<
  NonNullable<GetAccountsParams["sort"]>,
  Record<string, SortOrder>
> = {
  newest: {
    createdAt: -1,
  },

  oldest: {
    createdAt: 1,
  },

  balance: {
    currentBalance: -1,
  },
};

  const [accounts, total] =
    await Promise.all([
      Account.find(query)
        .populate(
          "user",
          "firstName lastName customerId"
        )
        .sort(sortMap[sort])
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Account.countDocuments(query),
    ]);

  type AccountWithUser = Awaited<
  ReturnType<typeof Account.find>
>[number] & {
  user?: {
    _id: { toString(): string };
    firstName: string;
    lastName: string;
    customerId: string;
  } | null;
};

const data: AdminAccount[] = (accounts as AccountWithUser[]).map(
  (account) => ({
    id: account._id.toString(),

    userId: account.user?._id?.toString() ?? "",

    customerName: account.user
      ? `${account.user.firstName} ${account.user.lastName}`
      : "Unknown",

    accountNumber: account.accountNumber,

    routingNumber: account.routingNumber,

    nickname: account.nickname,

    type: account.type,

    status: account.status,

    currency: account.currency,

    availableBalance: account.availableBalance,

    currentBalance: account.currentBalance,

    interestRate: account.interestRate,

    overdraftLimit: account.overdraftLimit,

    openedAt: account.openedAt
  ? account.openedAt.toISOString()
  : null,

lastActivityAt: account.lastActivityAt
  ? account.lastActivityAt.toISOString()
  : null,

createdAt: account.createdAt
  ? account.createdAt.toISOString()
  : null,
  })
);

  return {
    success: true,

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