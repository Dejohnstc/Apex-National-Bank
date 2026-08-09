import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { AdminAccount } from "@/types/admin/account.types";

interface Props {
  account: AdminAccount;
}

export function AccountInfoCard({
  account,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Customer
          </span>

          <span>{account.customerName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Account Number
          </span>

          <span>{account.accountNumber}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Routing Number
          </span>

          <span>{account.routingNumber}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Nickname
          </span>

          <span>{account.nickname}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Type
          </span>

          <span>{account.type}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Status
          </span>

          <span>{account.status}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Currency
          </span>

          <span>{account.currency}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Opened
          </span>

          <span>
            {new Date(account.openedAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}