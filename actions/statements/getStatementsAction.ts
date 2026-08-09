"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { getStatements } from "@/services/statements/getStatements";

import {
  statementFilterSchema,
  type StatementFilter,
} from "@/validators/statements/statementFilters";

export async function getStatementsAction(
  filters: StatementFilter
) {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validated =
    statementFilterSchema.parse(filters);

  const statements =
    await getStatements(
      session.user.id,
      validated
    );

  return statements.map(
    (statement) => ({
      ...statement,

      _id:
        statement._id.toString(),

      account:
        statement.account.toString(),

      user:
        statement.user.toString(),

      postedAt:
        statement.postedAt.toISOString(),

      createdAt:
        statement.createdAt.toISOString(),

      updatedAt:
        statement.updatedAt.toISOString(),

      direction:
        statement.direction as
          | "IN"
          | "OUT",
    })
  );
}