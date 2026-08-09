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
  if (!transaction) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Transaction Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          <div className="text-center">
            <TransactionAmount
              amount={transaction.amount}
              direction={transaction.direction}
              currency={transaction.currency}
            />

            <div className="mt-3">
              <TransactionStatusBadge
                status={transaction.status}
              />
            </div>
          </div>

          <Separator />

          <Detail
            label="Description"
            value={transaction.description}
          />

          <Detail
            label="Reference"
            value={transaction.reference}
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
            value={new Intl.NumberFormat(
              "en-US",
              {
                style: "currency",
                currency:
                  transaction.currency,
              }
            ).format(
              transaction.balanceAfter
            )}
          />

          <Detail
            label="Fee"
            value={new Intl.NumberFormat(
              "en-US",
              {
                style: "currency",
                currency:
                  transaction.currency,
              }
            ).format(transaction.fee)}
          />

          <Detail
            label="Memo"
            value={transaction.memo || "-"}
          />

          <Detail
            label="Date"
            value={format(
              new Date(transaction.postedAt),
              "PPP p"
            )}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface DetailProps {
  label: string;
  value: React.ReactNode;
}

function Detail({
  label,
  value,
}: DetailProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span className="text-right font-medium">
        {value}
      </span>
    </div>
  );
}