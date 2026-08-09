"use client";

import { useTransition } from "react";

import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  BadgeDollarSign,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import type { LoanStatus } from "@/services/admin/loans";

import {
  approveLoanAction,
  rejectLoanAction,
  markLoanPaidAction,
} from "@/actions/admin/loans/actions";

interface Props {
  id: string;
  status: LoanStatus;
}

export function LoanRowActions({
  id,
  status,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          type="button"
          variant="ghost"
          size="icon"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {status === "PENDING" && (
          <>
            <DropdownMenuItem
              disabled={pending}
              onClick={() =>
                startTransition(() => {
                  void approveLoanAction(id);
                })
              }
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={pending}
              onClick={() =>
                startTransition(() => {
                  void rejectLoanAction(id);
                })
              }
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </DropdownMenuItem>
          </>
        )}

        {status === "ACTIVE" && (
          <DropdownMenuItem
            disabled={pending}
            onClick={() =>
              startTransition(() => {
                void markLoanPaidAction(id);
              })
            }
          >
            <BadgeDollarSign className="mr-2 h-4 w-4" />
            Mark Paid
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}