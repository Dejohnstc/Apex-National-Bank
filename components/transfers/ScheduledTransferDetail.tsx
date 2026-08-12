"use client";

import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  Repeat,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface AccountInfo {
  id: string;
  nickname: string;
  accountNumber: string;
  type: string;
  currency: string;
}

interface ScheduledTransferDetailsProps {
  transfer: {
    _id: string;
    amount: number;
    description: string;
    reference: string;
    scheduledDate: string;
    nextRunAt: string | null;
    lastRunAt: string | null;
    isRecurring: boolean;
    recurringFrequency: string;
    status: string;
    failureReason: string | null;
    completedAt: string | null;
    cancelledAt: string | null;
    createdAt: string;
    fromAccount: AccountInfo | null;
    toAccount: AccountInfo | null;
  };
}

function money(
  amount: number,
  currency = "USD"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function dateTime(
  value: string | null
) {
  if (!value) return "—";

  return new Date(value).toLocaleString(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}

function frequencyLabel(
  frequency: string
) {
  switch (frequency) {
    case "WEEKLY":
      return "Weekly";

    case "BIWEEKLY":
      return "Every 2 weeks";

    case "MONTHLY":
      return "Monthly";

    case "QUARTERLY":
      return "Quarterly";

    case "YEARLY":
      return "Yearly";

    default:
      return "One-time";
  }
}

function StatusIcon({
  status,
}: {
  status: string;
}) {
  if (status === "COMPLETED") {
    return (
      <CheckCircle2 className="h-5 w-5" />
    );
  }

  if (status === "FAILED") {
    return (
      <XCircle className="h-5 w-5" />
    );
  }

  if (status === "CANCELLED") {
    return (
      <XCircle className="h-5 w-5" />
    );
  }

  return (
    <Clock className="h-5 w-5" />
  );
}

export default function ScheduledTransferDetails({
  transfer,
}: ScheduledTransferDetailsProps) {
  const currency =
    transfer.fromAccount?.currency ??
    "USD";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>
                Scheduled Transfer
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Reference:{" "}
                {transfer.reference}
              </p>
            </div>

            <Badge
              variant={
                transfer.status ===
                "FAILED"
                  ? "destructive"
                  : transfer.status ===
                    "CANCELLED"
                  ? "outline"
                  : "secondary"
              }
              className="w-fit"
            >
              <StatusIcon
                status={transfer.status}
              />

              <span className="ml-1">
                {transfer.status}
              </span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">
              Transfer Amount
            </p>

            <p className="mt-1 text-4xl font-bold">
              {money(
                transfer.amount,
                currency
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Accounts
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="rounded-xl border p-5">
              <p className="text-xs text-muted-foreground">
                From Account
              </p>

              <p className="mt-1 font-semibold">
                {transfer.fromAccount
                  ?.nickname ??
                  "Account"}
              </p>

              <p className="text-sm text-muted-foreground">
                ••••
                {transfer.fromAccount?.accountNumber.slice(
                  -4
                )}
              </p>
            </div>

            <ArrowRight className="hidden h-5 w-5 text-muted-foreground md:block" />

            <div className="rounded-xl border p-5">
              <p className="text-xs text-muted-foreground">
                To Account
              </p>

              <p className="mt-1 font-semibold">
                {transfer.toAccount
                  ?.nickname ??
                  "Account"}
              </p>

              <p className="text-sm text-muted-foreground">
                ••••
                {transfer.toAccount?.accountNumber.slice(
                  -4
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Schedule Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">
              <CalendarClock className="mr-1 inline h-4 w-4" />
              Scheduled Date
            </p>

            <p className="mt-1 font-medium">
              {dateTime(
                transfer.scheduledDate
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              <Repeat className="mr-1 inline h-4 w-4" />
              Frequency
            </p>

            <p className="mt-1 font-medium">
              {transfer.isRecurring
                ? frequencyLabel(
                    transfer.recurringFrequency
                  )
                : "One-time"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Next Run
            </p>

            <p className="mt-1 font-medium">
              {dateTime(
                transfer.nextRunAt
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Last Run
            </p>

            <p className="mt-1 font-medium">
              {dateTime(
                transfer.lastRunAt
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Created
            </p>

            <p className="mt-1 font-medium">
              {dateTime(
                transfer.createdAt
              )}
            </p>
          </div>

          {transfer.completedAt && (
            <div>
              <p className="text-sm text-muted-foreground">
                Completed
              </p>

              <p className="mt-1 font-medium">
                {dateTime(
                  transfer.completedAt
                )}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {transfer.description && (
        <Card>
          <CardHeader>
            <CardTitle>
              Memo
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm">
              {transfer.description}
            </p>
          </CardContent>
        </Card>
      )}

      {transfer.failureReason && (
        <Card>
          <CardHeader>
            <CardTitle>
              Failure Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              {transfer.failureReason}
            </div>
          </CardContent>
        </Card>
      )}

      {transfer.cancelledAt && (
        <Card>
          <CardHeader>
            <CardTitle>
              Cancellation
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              This scheduled transfer was
              cancelled on{" "}
              <span className="font-medium text-foreground">
                {dateTime(
                  transfer.cancelledAt
                )}
              </span>
              .
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}