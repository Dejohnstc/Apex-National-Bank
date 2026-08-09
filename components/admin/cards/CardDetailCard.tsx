import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AdminCard } from "@/services/admin/cards";

interface Props {
  card: AdminCard;
}

export function CardDetailCard({
  card,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Card Details
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Row
          label="Card Holder"
          value={card.holderName}
        />

        <Row
          label="Card Number"
          value={card.cardNumber}
        />

        <Row
          label="Network"
          value={card.network}
        />

        <Row
          label="Type"
          value={card.type}
        />

        <Row
          label="Status"
          value={card.status}
        />

        <Row
          label="Daily Limit"
          value={`$${card.dailyLimit.toLocaleString()}`}
        />

        <Row
          label="Expires"
          value={`${String(
            card.expiryMonth
          ).padStart(
            2,
            "0"
          )}/${card.expiryYear}`}
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