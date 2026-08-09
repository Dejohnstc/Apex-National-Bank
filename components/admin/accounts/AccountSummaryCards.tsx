import { Card, CardContent } from "@/components/ui/card";

import { Wallet } from "lucide-react";

import type { AdminAccount } from "@/types/admin/account.types";

interface Props {
  accounts: AdminAccount[];
}

export function AccountSummaryCards({
  accounts,
}: Props) {
  const totalAccounts =
    accounts.length;

  const totalBalance =
    accounts.reduce(
      (sum, account) =>
        sum +
        account.currentBalance,
      0
    );

  const active =
    accounts.filter(
      (a) => a.status === "ACTIVE"
    ).length;

  const frozen =
    accounts.filter(
      (a) => a.status === "FROZEN"
    ).length;

  const cards = [
    {
      title: "Accounts",
      value: totalAccounts.toLocaleString(),
    },
    {
      title: "Active",
      value: active.toLocaleString(),
    },
    {
      title: "Frozen",
      value: frozen.toLocaleString(),
    },
    {
      title: "Balances",
      value:
        totalBalance.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
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

            <Wallet className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}