"use client";

import { useState } from "react";
import { format } from "date-fns";

import type { TransactionListItem } from "@/services/transaction/getTransactions";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { TransactionAmount } from "./TransactionAmount";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { TransactionDetailsSheet } from "./TransactionDetailsSheet";

interface Props {
  transaction: TransactionListItem;
}

export function TransactionRow({
  transaction,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        onClick={() => setOpen(true)}
        className="cursor-pointer transition-colors hover:bg-muted/40"
      >
        <TableCell>
          <div className="font-medium">
            {format(
              new Date(transaction.postedAt),
              "MMM d, yyyy"
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            {format(
              new Date(transaction.postedAt),
              "h:mm a"
            )}
          </div>
        </TableCell>

        <TableCell>
          <div className="font-medium">
            {transaction.description}
          </div>

          {transaction.counterpartyName && (
            <div className="text-sm text-muted-foreground">
              {transaction.counterpartyName}
            </div>
          )}
        </TableCell>

        <TableCell className="font-mono text-xs">
          {transaction.reference}
        </TableCell>

        <TableCell>
          <TransactionStatusBadge
            status={transaction.status}
          />
        </TableCell>

        <TableCell className="text-right">
          <TransactionAmount
            amount={transaction.amount}
            direction={transaction.direction}
            currency={transaction.currency}
          />
        </TableCell>

        <TableCell className="text-right font-semibold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: transaction.currency,
          }).format(transaction.balanceAfter)}
        </TableCell>
      </TableRow>

      <TransactionDetailsSheet
        open={open}
        onOpenChange={setOpen}
        transaction={transaction}
      />
    </>
  );
}