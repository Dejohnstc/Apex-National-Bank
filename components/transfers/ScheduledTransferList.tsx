"use client";

import {
  CalendarClock,
  CheckCircle2,
  Clock,
  Repeat,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type ScheduledTransferStatus =
  | "SCHEDULED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export type ScheduledTransferFrequency =
  | "NONE"
  | "WEEKLY"
  | "BIWEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "YEARLY";

export interface ScheduledTransferItem {
  id: string;
  fromAccountName: string;
  fromAccountLast4: string;
  toAccountName: string;
  toAccountLast4: string;
  amount: number;
  description: string;
  reference: string;
  scheduledDate: string | Date;
  nextRunAt: string | Date | null;
  isRecurring: boolean;
  recurringFrequency: ScheduledTransferFrequency;
  status: ScheduledTransferStatus;
}

interface Props {
  transfers: ScheduledTransferItem[];
  onCancel?: (transfer: ScheduledTransferItem) => void;
  onView?: (transfer: ScheduledTransferItem) => void;
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(
  value: string | Date | null
) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

function frequencyLabel(
  frequency: ScheduledTransferFrequency
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

function StatusBadge({
  status,
}: {
  status: ScheduledTransferStatus;
}) {
  if (status === "SCHEDULED") {
    return (
      <Badge variant="secondary">
        <Clock className="mr-1 h-3.5 w-3.5" />
        Scheduled
      </Badge>
    );
  }

  if (status === "PROCESSING") {
    return (
      <Badge variant="secondary">
        <Clock className="mr-1 h-3.5 w-3.5" />
        Processing
      </Badge>
    );
  }

  if (status === "COMPLETED") {
    return (
      <Badge>
        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
        Completed
      </Badge>
    );
  }

  if (status === "FAILED") {
    return (
      <Badge variant="destructive">
        <XCircle className="mr-1 h-3.5 w-3.5" />
        Failed
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <XCircle className="mr-1 h-3.5 w-3.5" />
      Cancelled
    </Badge>
  );
}

export default function ScheduledTransferList({
  transfers,
  onCancel,
  onView,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <CalendarClock className="h-5 w-5 text-primary" />
          </div>

          <div>
            <CardTitle>
              Scheduled & Recurring Transfers
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage transfers that are scheduled
              for a future date.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {transfers.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <CalendarClock className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">
              No scheduled transfers
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Scheduled and recurring transfers
              will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {transfers.map((transfer) => {
              const canCancel =
                transfer.status === "SCHEDULED";

              return (
                <div
                  key={transfer.id}
                  className="rounded-xl border p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge
                          status={transfer.status}
                        />

                        {transfer.isRecurring && (
                          <Badge variant="outline">
                            <Repeat className="mr-1 h-3.5 w-3.5" />
                            {frequencyLabel(
                              transfer.recurringFrequency
                            )}
                          </Badge>
                        )}
                      </div>

                      <div>
                        <p className="font-semibold">
                          {transfer.fromAccountName}
                          {" ••••"}
                          {transfer.fromAccountLast4}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          To{" "}
                          {transfer.toAccountName}
                          {" ••••"}
                          {transfer.toAccountLast4}
                        </p>
                      </div>

                      {transfer.description && (
                        <p className="text-sm text-muted-foreground">
                          {transfer.description}
                        </p>
                      )}

                      <div className="grid gap-3 text-sm sm:grid-cols-3">
                        <div>
                          <p className="text-muted-foreground">
                            Amount
                          </p>

                          <p className="font-semibold">
                            {formatMoney(
                              transfer.amount
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">
                            Scheduled
                          </p>

                          <p className="font-medium">
                            {formatDate(
                              transfer.scheduledDate
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">
                            Next Run
                          </p>

                          <p className="font-medium">
                            {transfer.isRecurring
                              ? formatDate(
                                  transfer.nextRunAt
                                )
                              : "One-time"}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Reference:{" "}
                        {transfer.reference}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      {onView && (
                        <Button
                          variant="outline"
                          onClick={() =>
                            onView(transfer)
                          }
                        >
                          View
                        </Button>
                      )}

                      {onCancel &&
                        canCancel && (
                          <Button
                            variant="destructive"
                            onClick={() =>
                              onCancel(
                                transfer
                              )
                            }
                          >
                            Cancel
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}