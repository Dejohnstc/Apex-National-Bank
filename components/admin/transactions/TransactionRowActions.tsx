"use client";

import { useTransition } from "react";

import {
  MoreHorizontal,
  RotateCcw,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { reverseTransactionAction } from "@/actions/admin/transactions/actions";

interface Props {
  id: string;
  reversed: boolean;
}

export function TransactionRowActions({
  id,
  reversed,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {!reversed && (
          <DropdownMenuItem
            disabled={pending}
            onClick={() =>
              startTransition(() => {
                void reverseTransactionAction(id);
              })
            }
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reverse Transaction
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}