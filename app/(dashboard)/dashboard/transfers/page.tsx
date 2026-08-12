"use client";

import { useState } from "react";

import { TransferForm } from "@/components/transfers/TransferForm";
import { ScheduledTransferForm } from "@/components/transfers/ScheduledTransferForm";
import ScheduledTransferList, {
  type ScheduledTransferItem,
} from "@/components/transfers/ScheduledTransferList";
import CancelScheduledTransferDialog from "@/components/transfers/CancelScheduledTransferDialog";
import { TransferHistory } from "@/components/transfers/TransferHistory";

import type { Account, Transaction } from "@/types";

interface Props {
  accounts: Account[];
  transfers: Transaction[];
  scheduledTransfers: ScheduledTransferItem[];
}

export default function TransfersPageClient({
  accounts,
  transfers,
  scheduledTransfers,
}: Props) {
  const [cancelTransfer, setCancelTransfer] =
    useState<ScheduledTransferItem | null>(null);

  return (
    <div className="space-y-8">
      <TransferForm
        accounts={accounts}
      />

      <ScheduledTransferForm
        accounts={accounts}
      />

      <ScheduledTransferList
        transfers={scheduledTransfers}
        onCancel={(transfer) =>
          setCancelTransfer(transfer)
        }
      />

      <TransferHistory
        transfers={transfers}
      />

      <CancelScheduledTransferDialog
        open={!!cancelTransfer}
        onOpenChange={(open) => {
          if (!open) {
            setCancelTransfer(null);
          }
        }}
        transfer={cancelTransfer}
        onCancelled={() => {
          setCancelTransfer(null);
        }}
      />
    </div>
  );
}