"use client";

import type { Transaction } from "@/types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface TransactionReceiptProps {
  transaction: Transaction;
}

export function TransactionReceipt({
  transaction,
}: TransactionReceiptProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>
          Transaction Receipt
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <ReceiptRow
          label="Reference"
          value={transaction.reference}
        />

        <ReceiptRow
          label="Status"
          value={transaction.status}
        />

        <ReceiptRow
          label="Type"
          value={transaction.type}
        />

        <ReceiptRow
          label="Direction"
          value={transaction.direction}
        />

        <ReceiptRow
          label="Amount"
          value={`$${transaction.amount.toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
            }
          )}`}
        />

        <ReceiptRow
          label="Description"
          value={transaction.description}
        />

        <ReceiptRow
          label="Memo"
          value={transaction.memo || "-"}
        />

        <ReceiptRow
          label="Date"
          value={new Date(
            transaction.createdAt
          ).toLocaleString()}
        />

        <div className="flex gap-4 pt-4">
          <Button
            onClick={() => window.print()}
          >
            Print Receipt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface ReceiptRowProps {
  label: string;
  value: string;
}

function ReceiptRow({
  label,
  value,
}: ReceiptRowProps) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span className="font-medium text-muted-foreground">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}