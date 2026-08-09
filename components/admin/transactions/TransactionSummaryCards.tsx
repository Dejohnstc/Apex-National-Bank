import { Card, CardContent } from "@/components/ui/card";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  Activity,
} from "lucide-react";

import type { TransactionSummary } from "@/types/admin/transaction.types";

interface Props {
  summary: TransactionSummary;
}

export function TransactionSummaryCards({
  summary,
}: Props) {
  const cards = [
    {
      title: "Transactions",
      value:
        summary.totalTransactions.toLocaleString(),
      icon: Activity,
    },
    {
      title: "Credits",
      value:
        summary.totalCredits.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ),
      icon: ArrowDownCircle,
    },
    {
      title: "Debits",
      value:
        summary.totalDebits.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ),
      icon: ArrowUpCircle,
    },
    {
      title: "Volume",
      value:
        summary.totalVolume.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ),
      icon: Wallet,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardContent className="flex items-center justify-between py-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {card.value}
                </h2>
              </div>

              <Icon className="h-8 w-8 text-muted-foreground" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}