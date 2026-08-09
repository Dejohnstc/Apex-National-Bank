"use client";

import { Card, CardContent } from "@/components/ui/card";

import type { Statement } from "@/types/statement";

interface Props {
  statements: Statement[];
}

function money(
  amount: number,
  currency = "USD"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export default function StatementSummary({
  statements,
}: Props) {
  const openingBalance =
    statements.length > 0
      ? statements[
          statements.length - 1
        ].balanceBefore
      : 0;

  const closingBalance =
    statements.length > 0
      ? statements[0]
          .balanceAfter
      : 0;

  const credits =
    statements
      .filter(
        (t) =>
          t.direction === "IN"
      )
      .reduce(
        (sum, t) =>
          sum + t.amount,
        0
      );

  const debits =
    statements
      .filter(
        (t) =>
          t.direction ===
          "OUT"
      )
      .reduce(
        (sum, t) =>
          sum + t.amount,
        0
      );

  const fees =
    statements.reduce(
      (sum, t) =>
        sum + t.fee,
      0
    );

  const cards = [
    {
      title:
        "Opening Balance",
      value: money(
        openingBalance
      ),
    },
    {
      title:
        "Total Credits",
      value: money(credits),
    },
    {
      title:
        "Total Debits",
      value: money(debits),
    },
    {
      title: "Fees",
      value: money(fees),
    },
    {
      title:
        "Closing Balance",
      value: money(
        closingBalance
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