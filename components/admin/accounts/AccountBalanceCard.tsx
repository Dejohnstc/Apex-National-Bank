import { Card, CardContent } from "@/components/ui/card";

import type { AdminAccount } from "@/types/admin/account.types";

interface Props {
  account: AdminAccount;
}

export function AccountBalanceCard({
  account,
}: Props) {
  return (
    <Card>
      <CardContent className="space-y-5 py-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Available Balance
          </p>

          <h2 className="text-3xl font-bold">
            {account.availableBalance.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency:
                  account.currency,
              }
            )}
          </h2>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Current Balance
          </p>

          <h3 className="text-xl font-semibold">
            {account.currentBalance.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency:
                  account.currency,
              }
            )}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Interest Rate
            </p>

            <p className="font-semibold">
              {account.interestRate}%
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Overdraft
            </p>

            <p className="font-semibold">
              {account.overdraftLimit.toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency:
                    account.currency,
                }
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}