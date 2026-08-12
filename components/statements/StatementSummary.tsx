"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type { Statement } from "@/types/statement";

interface Props {
  statements: Statement[];
}

function money(
  amount: number,
  currency: string
) {
  try {
    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency,
      }
    ).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export default function StatementSummary({
  statements,
}: Props) {
  if (statements.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          No statement data available for the selected filters.
        </p>
      </div>
    );
  }

  /*
   * Statements are sorted newest → oldest.
   *
   * Therefore:
   * - First statement = newest transaction
   * - Last statement = oldest transaction
   */
  const newest = statements[0];
  const oldest =
    statements[statements.length - 1];

  const currency =
    newest.currency || "USD";

  const openingBalance =
    oldest.balanceBefore;

  const closingBalance =
    newest.balanceAfter;

  const credits = statements
    .filter(
      (statement) =>
        statement.direction === "IN"
    )
    .reduce(
      (sum, statement) =>
        sum + statement.amount,
      0
    );

  const debits = statements
    .filter(
      (statement) =>
        statement.direction === "OUT"
    )
    .reduce(
      (sum, statement) =>
        sum + statement.amount,
      0
    );

  const fees = statements.reduce(
    (sum, statement) =>
      sum + statement.fee,
    0
  );

  const cards = [
    {
      title: "Opening Balance",
      value: money(
        openingBalance,
        currency
      ),
    },
    {
      title: "Total Credits",
      value: money(
        credits,
        currency
      ),
    },
    {
      title: "Total Debits",
      value: money(
        debits,
        currency
      ),
    },
    {
      title: "Fees",
      value: money(
        fees,
        currency
      ),
    },
    {
      title: "Closing Balance",
      value: money(
        closingBalance,
        currency
      ),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              {card.title}
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {card.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}