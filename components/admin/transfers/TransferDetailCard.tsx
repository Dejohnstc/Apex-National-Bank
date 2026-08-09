import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AdminTransfer } from "@/services/admin/transfers/types";

interface Props {
  transfer: AdminTransfer;
}

export function TransferDetailCard({
  transfer,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Transfer Details
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Row
          label="Reference"
          value={transfer.reference}
        />

        <Row
          label="Recipient"
          value={
            transfer.recipientName ??
            "N/A"
          }
        />

        <Row
          label="Amount"
          value={transfer.amount.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency:
                transfer.currency ??
                "USD",
            }
          )}
        />

        <Row
          label="Type"
          value={transfer.type}
        />

        <Row
          label="Status"
          value={transfer.status}
        />

        <Row
          label="Created"
          value={new Date(
            transfer.createdAt
          ).toLocaleString()}
        />
      </CardContent>
    </Card>
  );
}

interface RowProps {
  label: string;
  value: ReactNode;
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