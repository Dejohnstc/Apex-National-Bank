import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getStatements } from "@/services/statements/getStatements";

import PageClient from "./page-client";

export default async function StatementsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const statements = await getStatements(
    session.user.id,
    {}
  );

  const serializedStatements = statements.map(
    (statement) => ({
      ...statement,
      _id: statement._id.toString(),
      account: statement.account.toString(),
      user: statement.user.toString(),
      postedAt: statement.postedAt.toISOString(),
      createdAt: statement.createdAt.toISOString(),
      updatedAt: statement.updatedAt.toISOString(),

      direction:
        statement.direction as "IN" | "OUT",
    })
  );

  return (
    <PageClient
      initialStatements={serializedStatements}
    />
  );
}