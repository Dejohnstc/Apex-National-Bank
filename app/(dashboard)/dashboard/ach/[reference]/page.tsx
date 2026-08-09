import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import CancelAchTransferButton from "@/components/ach/CancelAchTransferButton";

import { getAchTransferByReference } from "@/services/ach/getAchTransferByReference";

interface Props {
  params: Promise<{
    reference: string;
  }>;
}

function badgeVariant(status: string) {
  switch (status) {
    case "COMPLETED":
      return "default" as const;

    case "PENDING":
      return "secondary" as const;

    case "PROCESSING":
      return "outline" as const;

    case "RETURNED":
    case "REJECTED":
    case "CANCELLED":
      return "destructive" as const;

    default:
      return "secondary" as const;
  }
}

export default async function AchTransferDetailsPage({
  params,
}: Props) {
  const { reference } = await params;

  const transfer =
    await getAchTransferByReference(reference);

  if (!transfer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          ACH Transfer Details
        </h1>

        <p className="text-muted-foreground">
          Reference: {transfer.reference}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Transfer Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Recipient
            </p>

            <p className="font-medium">
              {transfer.recipientName}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Bank
            </p>

            <p className="font-medium">
              {transfer.recipientBank}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Amount
            </p>

            <p className="font-medium">
              $
              {transfer.amount.toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                }
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <Badge
              variant={badgeVariant(
                transfer.status
              )}
            >
              {transfer.status}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Direction
            </p>

            <p>{transfer.direction}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Account Type
            </p>

            <p>{transfer.accountType}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Effective Date
            </p>

            <p>
              {new Date(
                transfer.effectiveDate
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Posted Date
            </p>

            <p>
              {transfer.postedDate
                ? new Date(
                    transfer.postedDate
                  ).toLocaleDateString()
                : "--"}
            </p>
          </div>

          {transfer.memo && (
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">
                Memo
              </p>

              <p>{transfer.memo}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {transfer.status === "PENDING" && (
        <Card>
          <CardHeader>
            <CardTitle>
              Pending Transfer
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This ACH transfer has not begun
              processing. Cancelling it will
              immediately restore the funds to your
              account.
            </p>

            <CancelAchTransferButton
              reference={transfer.reference}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}