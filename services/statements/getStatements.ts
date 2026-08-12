import { connectDB } from "@/lib/db/mongodb";

import { Transaction } from "@/models/transaction/Transaction";
import { Account } from "@/models/account/Account";

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

  /*
   * If an account was selected, make sure it
   * actually belongs to the authenticated user.
   */
  if (validated.accountId) {
    const account = await Account.exists({
      _id: validated.accountId,
      user: userId,
      status: "ACTIVE",
    });

    if (!account) {
      return [];
    }

    query.account = validated.accountId;
  }

  /*
   * Transaction type filter
   */
  if (
    validated.type &&
    validated.type !== "all"
  ) {
    query.type = validated.type;
  }

  /*
   * Search
   */
  if (validated.search) {
    query.$or = [
      {
        description: {
          $regex: validated.search,
          $options: "i",
        },
      },
      {
        reference: {
          $regex: validated.search,
          $options: "i",
        },
      },
      {
        merchant: {
          $regex: validated.search,
          $options: "i",
        },
      },
      {
        category: {
          $regex: validated.search,
          $options: "i",
        },
      },
      {
        counterpartyName: {
          $regex: validated.search,
          $options: "i",
        },
      },
    ];
  }

  /*
   * Date range
   *
   * Make the selected "to" date inclusive.
   */
  if (validated.from || validated.to) {
    const postedAt: Record<string, Date> = {};

    if (validated.from) {
      const from = new Date(
        validated.from
      );

      from.setHours(
        0,
        0,
        0,
        0
      );

      postedAt.$gte = from;
    }

    if (validated.to) {
      const to = new Date(
        validated.to
      );

      to.setHours(
        23,
        59,
        59,
        999
      );

      postedAt.$lte = to;
    }

    query.postedAt = postedAt;
  }

  return Transaction.find(query)
    .sort({
      postedAt: -1,
    })
    .lean();
}