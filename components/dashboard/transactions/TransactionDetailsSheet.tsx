"use client";

import { format } from "date-fns";

import type {
  TransactionListItem,
} from "@/services/transaction/getTransactions";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";

import { TransactionAmount } from "./TransactionAmount";
import { TransactionStatusBadge } from "./TransactionStatusBadge";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: TransactionListItem | null;
}

export function TransactionDetailsSheet({
  open,
  onOpenChange,
  transaction,
}: Props) {
  if (!transaction) {
    return null;
  }

  const currency =
    transaction.currency || "USD";

  const formatter =
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    });

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        className="
          w-full
          overflow-y-auto
          px-5
          sm:max-w-lg
          sm:px-6
        "
      >
        {/* Header */}

        <SheetHeader className="border-b pb-5">
          <SheetTitle className="text-xl font-bold">
            Transaction Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Amount + Status */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <div className="text-center">

              <div className="text-2xl font-bold">
                <TransactionAmount
                  amount={
                    transaction.amount
                  }
                  direction={
                    transaction.direction
                  }
                  currency={currency}
                />
              </div>

              <div className="mt-3 flex justify-center">
                <TransactionStatusBadge
                  status={
                    transaction.status
                  }
                />
              </div>

            </div>

          </div>

          <Separator />

          {/* Transaction information */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

            <Detail
              label="Description"
              value={
                transaction.description ||
                "-"
              }
            />

            <Detail
              label="Reference"
              value={
                transaction.reference ||
                "-"
              }
              mono
            />

            <Detail
              label="Counterparty"
              value={
                transaction.counterpartyName ||
                "-"
              }
            />

            <Detail
              label="Balance After"
              value={formatter.format(
                transaction.balanceAfter
              )}
            />

            <Detail
              label="Fee"
              value={formatter.format(
                transaction.fee ?? 0
              )}
            />

            <Detail
              label="Memo"
              value={
                transaction.memo || "-"
              }
            />

            <Detail
              label="Date"
              value={format(
                new Date(
                  transaction.postedAt
                ),
                "PPP p"
              )}
            />

          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}

interface DetailProps {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}

function Detail({
  label,
  value,
  mono = false,
}: DetailProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-2
        border-b
        border-slate-100
        px-4
        py-4
        last:border-b-0
        sm:grid-cols-[130px_minmax(0,1fr)]
        sm:items-start
        sm:gap-4
      "
    >
      {/* Label */}

      <span
        className="
          text-sm
          font-medium
          text-muted-foreground
        "
      >
        {label}
      </span>

      {/* Value */}

      <span
        className={`
          min-w-0
          break-words
          whitespace-normal
          text-left
          text-sm
          font-semibold
          text-slate-900
          sm:text-right
          ${mono ? "font-mono text-xs sm:text-sm" : ""}
        `}
      >
        {value}
      </span>
    </div>
  );
}