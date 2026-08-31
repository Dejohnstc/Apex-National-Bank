import { useState } from "react";

import type { TransactionListItem } from "@/services/transaction/getTransactions";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TransactionEmpty } from "./TransactionEmpty";
import { TransactionRow } from "./TransactionRow";
import { TransactionDetailsSheet } from "./TransactionDetailsSheet";

interface TransactionTableProps {
  account: import("@/types/account").Account;
  transactions: TransactionListItem[];
}

export function TransactionTable({
  transactions,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return <TransactionEmpty />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">

      {/* =========================
          DESKTOP TABLE
      ========================== */}

      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Date
              </TableHead>

              <TableHead>
                Description
              </TableHead>

              <TableHead>
                Reference
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              <TableHead className="text-right">
                Amount
              </TableHead>

              <TableHead className="text-right">
                Balance
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map(
              (transaction) => (
                <TransactionRow
                  key={transaction._id}
                  transaction={transaction}
                />
              )
            )}
          </TableBody>
        </Table>
      </div>

      {/* =========================
          MOBILE TRANSACTIONS
      ========================== */}

      <div className="divide-y md:hidden">
        {transactions.map(
          (transaction) => (
            <MobileTransaction
              key={transaction._id}
              transaction={transaction}
            />
          )
        )}
      </div>

    </div>
  );
}

/* =========================
   MOBILE TRANSACTION
========================= */

function MobileTransaction({
  transaction,
}: {
  transaction: TransactionListItem;
}) {
  const [open, setOpen] =
    useState(false);

  const isCredit =
    transaction.direction ===
    "CREDIT";

  const amount =
    new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency:
          transaction.currency ||
          "USD",
      }
    ).format(transaction.amount);

  const date = new Date(
    transaction.createdAt
  ).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setOpen(true)
        }
        className="block w-full p-4 text-left transition-colors hover:bg-muted/40 active:bg-muted/60"
        aria-label={`View transaction ${transaction.description}`}
      >
        {/* Transaction */}

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0 flex-1">

            <p className="truncate font-semibold text-slate-900">
              {transaction.description}
            </p>

            {transaction.counterpartyName && (
              <p className="mt-1 truncate text-sm text-slate-500">
                {transaction.counterpartyName}
              </p>
            )}

            <p className="mt-1 text-xs text-slate-500">
              {date}
            </p>

          </div>

          <p
            className={`shrink-0 whitespace-nowrap text-right font-bold ${
              isCredit
                ? "text-emerald-600"
                : "text-slate-900"
            }`}
          >
            {isCredit ? "+" : "-"}
            {amount}
          </p>

        </div>

        {/* Reference + Status */}

        <div className="mt-3 flex items-center justify-between gap-3">

          <p className="min-w-0 truncate text-xs text-slate-500">
            Ref: {transaction.reference}
          </p>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              transaction.status ===
              "COMPLETED"
                ? "bg-emerald-100 text-emerald-700"
                : transaction.status ===
                  "PENDING"
                ? "bg-amber-100 text-amber-700"
                : transaction.status ===
                  "FAILED"
                ? "bg-red-100 text-red-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {transaction.status}
          </span>

        </div>

      </button>

      <TransactionDetailsSheet
        open={open}
        onOpenChange={setOpen}
        transaction={transaction}
      />
    </>
  );
}