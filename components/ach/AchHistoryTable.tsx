"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AchTransferRow {
  reference: string;
  recipientName: string;
  recipientBank: string;
  amount: number;
  status: string;
  direction: string;
  createdAt: string;
}

interface Props {
  transfers: AchTransferRow[];
}

function statusVariant(status: string) {
  switch (status) {
    case "COMPLETED":
      return "default";

    case "PENDING":
      return "secondary";

    case "PROCESSING":
      return "outline";

    case "RETURNED":
    case "REJECTED":
    case "CANCELLED":
      return "destructive";

    default:
      return "secondary";
  }
}

export default function AchHistoryTable({
  transfers,
}: Props) {
  if (transfers.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <h2 className="text-lg font-semibold">
            No ACH Transfers
          </h2>

          <p className="mt-2 text-muted-foreground">
            Your ACH transfer history will appear
            here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 text-left">
                Recipient
              </th>

              <th className="p-4 text-left">
                Bank
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>
            {transfers.map((transfer) => (
              <tr
                key={transfer.reference}
                className="border-b"
              >
                <td className="p-4">
                  {transfer.recipientName}
                </td>

                <td className="p-4">
                  {transfer.recipientBank}
                </td>

                <td className="p-4 font-medium">
                  $
                  {transfer.amount.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </td>

                <td className="p-4">
                  <Badge
                    variant={statusVariant(
                      transfer.status
                    )}
                  >
                    {transfer.status}
                  </Badge>
                </td>

                <td className="p-4">
                  {new Date(
                    transfer.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4 text-right">
                  <Link
  href={`/dashboard/ach/${transfer.reference}`}
>
  <Button
    variant="outline"
    size="sm"
  >
    Details
  </Button>
</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}