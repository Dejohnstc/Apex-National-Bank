import Link from "next/link";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import type { AdminTransaction } from "@/types/admin/transaction.types";
import { TransactionRowActions } from "./TransactionRowActions";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { TransactionTypeBadge } from "./TransactionTypeBadge";
import { TransactionDirectionBadge } from "./TransactionDirectionBadge";
import { TransactionAmount } from "./TransactionAmount";

interface Props {
  transactions: AdminTransaction[];
}

export function TransactionTable({
  transactions,
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
              Reference
            </TableHead>

            <TableHead>
              Type
            </TableHead>

            <TableHead>
              Direction
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead>
              Amount
            </TableHead>

            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map(
            (transaction) => (
              <TableRow
                key={transaction.id}
              >
                <TableCell>
                  {
                    transaction.customerName
                  }
                </TableCell>

                <TableCell>
                  {
                    transaction.reference
                  }
                </TableCell>

                <TableCell>
                  <TransactionTypeBadge
                    type={
                      transaction.type
                    }
                  />
                </TableCell>

                <TableCell>
                  <TransactionDirectionBadge
                    direction={
                      transaction.direction
                    }
                  />
                </TableCell>

                <TableCell>
                  <TransactionStatusBadge
                    status={
                      transaction.status
                    }
                  />
                </TableCell>

                <TableCell>
                  <TransactionAmount
                    transaction={
                      transaction
                    }
                  />
                </TableCell>

                <TableCell>
  <div className="flex items-center justify-end gap-3">
    <Link
      href={`/admin/transactions/${transaction.id}`}
      className="font-medium text-primary"
    >
      View
    </Link>

    <TransactionRowActions
      id={transaction.id}
      reversed={
        transaction.status ===
        "REVERSED"
      }
    />
  </div>
</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}