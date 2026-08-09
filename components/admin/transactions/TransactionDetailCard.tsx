import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AdminTransaction } from "@/types/admin/transaction.types";

interface Props {
  transaction: AdminTransaction;
}

export function TransactionDetailCard({
  transaction,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Transaction Details
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Row
          label="Reference"
          value={transaction.reference}
        />

        <Row
          label="Customer"
          value={
            transaction.customerName
          }
        />

        <Row
          label="Account"
          value={
            transaction.accountNumber
          }
        />

        <Row
          label="Type"
          value={transaction.type}
        />

        <Row
          label="Direction"
          value={
            transaction.direction
          }
        />

        <Row
          label="Status"
          value={transaction.status}
        />

        <Row
          label="Amount"
          value={transaction.amount.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency:
                transaction.currency,
            }
          )}
        />

        <Row
          label="Fee"
          value={transaction.fee.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency:
                transaction.currency,
            }
          )}
        />

        <Row
          label="Description"
          value={
            transaction.description ??
            "-"
          }
        />

        <Row
          label="Posted"
          value={new Date(
            transaction.postedAt
          ).toLocaleString()}
        />
      </CardContent>
    </Card>
  );
}

interface RowProps {
  label: string;
  value: string;
}

function Row({
  label,
  value,
}: RowProps) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}