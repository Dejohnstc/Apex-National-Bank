import type { Statement } from "@/types/statement";

export interface FormattedStatement {
  date: string;
  description: string;
  category: string;
  reference: string;
  debit: string;
  credit: string;
  fee: string;
  balance: string;
  status: string;
}

function currency(
  amount: number,
  currency: string
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatStatementData(
  statements: Statement[]
): FormattedStatement[] {
  return statements.map((statement) => ({
    date: new Date(
      statement.postedAt
    ).toLocaleDateString(),

    description:
      statement.description,

    category:
      statement.category || "-",

    reference:
      statement.reference,

    debit:
      statement.direction === "OUT"
        ? currency(
            statement.amount,
            statement.currency
          )
        : "",

    credit:
      statement.direction === "IN"
        ? currency(
            statement.amount,
            statement.currency
          )
        : "",

    fee:
      statement.fee > 0
        ? currency(
            statement.fee,
            statement.currency
          )
        : "",

    balance: currency(
      statement.balanceAfter,
      statement.currency
    ),

    status: statement.status,
  }));
}