"use client";

import { useTransition } from "react";

import {
  MoreHorizontal,
  CheckCircle,
  Loader2,
  XCircle,
  Ban,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { updateTransferStatusAction } from "@/actions/admin/transfers/actions";

import type {
  TransferStatus,
  TransferType,
} from "@/services/admin/transfers/types";

interface Props {
  id: string;
  type: TransferType;
  status: string;
}

export function TransferRowActions({
  id,
  type,
  status,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  function update(
    nextStatus: TransferStatus
  ) {
    startTransition(() => {
      void updateTransferStatusAction(
        id,
        type,
        nextStatus
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        disabled={pending}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        {/* Pending */}

        {status === "PENDING" && (
          <>
            <DropdownMenuItem
              disabled={pending}
              onClick={() => update("APPROVED")}
            >
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Approve
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={pending}
              onClick={() => update("REJECTED")}
            >
              <XCircle className="mr-2 h-4 w-4 text-red-600" />
              Reject
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={pending}
              onClick={() => update("CANCELLED")}
            >
              <Ban className="mr-2 h-4 w-4" />
              Cancel
            </DropdownMenuItem>
          </>
        )}

        {/* Approved */}

        {status === "APPROVED" && (
          <>
            <DropdownMenuItem
              disabled={pending}
              onClick={() => update("PROCESSING")}
            >
              <Loader2 className="mr-2 h-4 w-4 text-blue-600" />
              Start Processing
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={pending}
              onClick={() => update("REJECTED")}
            >
              <XCircle className="mr-2 h-4 w-4 text-red-600" />
              Reject
            </DropdownMenuItem>
          </>
        )}

        {/* Processing */}

        {status === "PROCESSING" && (
          <>
            <DropdownMenuItem
              disabled={pending}
              onClick={() => update("COMPLETED")}
            >
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Complete Transfer
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={pending}
              onClick={() => update("FAILED")}
            >
              <AlertTriangle className="mr-2 h-4 w-4 text-orange-600" />
              Mark Failed
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={pending}
              onClick={() => update("RETURNED")}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Return Funds
            </DropdownMenuItem>
          </>
        )}

        {/* Completed */}

        {status === "COMPLETED" && (
          <DropdownMenuItem
            disabled={pending}
            onClick={() => update("RETURNED")}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reverse / Return
          </DropdownMenuItem>
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  );
}