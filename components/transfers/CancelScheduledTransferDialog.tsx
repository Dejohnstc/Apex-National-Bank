"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { cancelScheduledTransferAction } from "@/actions/transfer/cancelScheduledTransfer";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type {
  ScheduledTransferItem,
} from "./ScheduledTransferList";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transfer: ScheduledTransferItem | null;
  onCancelled?: (
    transfer: ScheduledTransferItem
  ) => void;
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
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

export default function CancelScheduledTransferDialog({
  open,
  onOpenChange,
  transfer,
  onCancelled,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  function handleCancel() {
    if (!transfer) return;

    startTransition(async () => {
      const result =
        await cancelScheduledTransferAction(
          transfer.id
        );

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to cancel transfer."
        );

        return;
      }

      toast.success(
        "Scheduled transfer cancelled."
      );

      onCancelled?.(transfer);
      onOpenChange(false);
    });
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Cancel Scheduled Transfer?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will cancel the scheduled
            transfer before it is processed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {transfer && (
          <div className="space-y-3 rounded-xl border bg-muted/40 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                Amount
              </span>

              <span className="font-semibold">
                {formatMoney(transfer.amount)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                From
              </span>

              <span className="text-right font-medium">
                {transfer.fromAccountName}
                {" ••••"}
                {transfer.fromAccountLast4}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                To
              </span>

              <span className="text-right font-medium">
                {transfer.toAccountName}
                {" ••••"}
                {transfer.toAccountLast4}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                Scheduled Date
              </span>

              <span className="font-medium">
                {formatDate(
                  transfer.scheduledDate
                )}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                Reference
              </span>

              <span className="font-mono text-xs">
                {transfer.reference}
              </span>
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
          >
            Keep Transfer
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={
              isPending || !transfer
            }
            onClick={(event) => {
              event.preventDefault();
              handleCancel();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending
              ? "Cancelling..."
              : "Cancel Transfer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}