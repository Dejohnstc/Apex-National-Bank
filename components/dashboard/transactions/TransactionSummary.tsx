import type { TransactionListItem } from "@/services/transaction/getTransactions";

import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Landmark,
} from "lucide-react";

interface Props {
  transactions: TransactionListItem[];
}

export function TransactionSummary({
  transactions,
}: Props) {
  const deposits = transactions
    .filter((t) => t.direction === "CREDIT")
    .reduce((sum, t) => sum + t.amount, 0);

  const withdrawals = transactions
    .filter((t) => t.direction === "DEBIT")
    .reduce((sum, t) => sum + t.amount, 0);

  const net = deposits - withdrawals;

  const cards = [
    {
      title: "Money In",
      value: deposits,
      icon: ArrowDownLeft,
    },
    {
      title: "Money Out",
      value: withdrawals,
      icon: ArrowUpRight,
    },
    {
      title: "Net Change",
      value: net,
      icon: Landmark,
    },
    {
      title: "Transactions",
      value: transactions.length,
      icon: CreditCard,
      count: true,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {card.count
                    ? card.value
                    : new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(card.value)}
                </h2>
              </div>

              <div className="rounded-xl bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}