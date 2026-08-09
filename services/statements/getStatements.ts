import { connectDB } from "@/lib/db/mongodb";

import { Transaction } from "@/models/transaction/Transaction";

import {
  StatementFilter,
  statementFilterSchema,
} from "@/validators/statements/statementFilters";

export async function getStatements(
  userId: string,
  filters: StatementFilter
) {
  await connectDB();

  const validated =
    statementFilterSchema.parse(filters);

  const query: Record<string, unknown> = {
    user: userId,
  };

  if (validated.accountId) {
    query.account =
      validated.accountId;
  }

  if (
    validated.type &&
    validated.type !== "all"
  ) {
    query.type =
      validated.type;
  }

  if (validated.search) {
    query.$or = [
      {
        description: {
          $regex:
            validated.search,
          $options: "i",
        },
      },
      {
        reference: {
          $regex:
            validated.search,
          $options: "i",
        },
      },
      {
        merchant: {
          $regex:
            validated.search,
          $options: "i",
        },
      },
      {
        category: {
          $regex:
            validated.search,
          $options: "i",
        },
      },
      {
        counterpartyName: {
          $regex:
            validated.search,
          $options: "i",
        },
      },
    ];
  }

  if (
    validated.from ||
    validated.to
  ) {
    query.postedAt = {};

    if (validated.from) {
      (
        query.postedAt as Record<
          string,
          Date
        >
      ).$gte =
        validated.from;
    }

    if (validated.to) {
      (
        query.postedAt as Record<
          string,
          Date
        >
      ).$lte =
        validated.to;
    }
  }

  return Transaction.find(query)
    .sort({
      postedAt: -1,
    })
    .lean();
}