import Link from "next/link";
import { AccountRowActions } from "./AccountRowActions";
import type { AdminAccount } from "@/types/admin/account.types";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { AccountStatusBadge } from "./AccountStatusBadge";
import { AccountTypeBadge } from "./AccountTypeBadge";

interface Props {
  accounts: AdminAccount[];
}

export function AccountTable({
  accounts,
}: Props) {
  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Customer
            </TableHead>

            <TableHead>
              Account
            </TableHead>

            <TableHead>
              Type
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead>
              Balance
            </TableHead>

            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {accounts.map((account) => (
            <TableRow
              key={account.id}
            >
              <TableCell>
                {account.customerName}
              </TableCell>

              <TableCell>
                {account.accountNumber}
              </TableCell>

              <TableCell>
                <AccountTypeBadge
                  type={account.type}
                />
              </TableCell>

              <TableCell>
                <AccountStatusBadge
                  status={
                    account.status
                  }
                />
              </TableCell>

              <TableCell>
                {account.currentBalance.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency:
                      account.currency,
                  }
                )}
              </TableCell>

             <TableCell className="flex justify-end gap-2">
  <Link
    href={`/admin/accounts/${account.id}`}
    className="text-primary font-medium"
  >
    View
  </Link>

  <AccountRowActions
    account={account}
  />
</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}