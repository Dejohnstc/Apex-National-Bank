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
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border bg-card p-3 shadow-sm sm:p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-xs text-muted-foreground sm:text-sm">
                  {card.title}
                </p>

                <h2
                  className={`mt-1 break-all font-bold text-slate-900 sm:mt-2 sm:text-2xl ${
                    card.count
                      ? "text-xl"
                      : "text-lg"
                  }`}
                >
                  {card.count
                    ? card.value
                    : new Intl.NumberFormat(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD",
                        }
                      ).format(card.value)}
                </h2>
              </div>

              <div className="shrink-0 rounded-xl bg-primary/10 p-2 sm:p-3">
                <Icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}