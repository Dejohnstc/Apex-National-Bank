"use client";

import { useTransition } from "react";

import {
  MoreHorizontal,
  Lock,
  Unlock,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  freezeAccountAction,
  unfreezeAccountAction,
  closeAccountAction,
} from "@/actions/admin/accounts/actions";

import type { AdminAccount } from "@/types/admin/account.types";

interface Props {
  account: AdminAccount;
}

export function AccountRowActions({
  account,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <DropdownMenu>
   <DropdownMenuTrigger
  className="
    inline-flex
    h-9
    w-9
    items-center
    justify-center
    rounded-md
    hover:bg-accent
    hover:text-accent-foreground
    transition-colors
    focus:outline-none
    focus:ring-2
    focus:ring-ring
  "
>
  <MoreHorizontal className="h-4 w-4" />
</DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {account.status === "ACTIVE" ? (
          <DropdownMenuItem
            disabled={pending}
            onClick={() => {
              startTransition(() => {
                void freezeAccountAction(account.id);
              });
            }}
          >
            <Lock className="mr-2 h-4 w-4" />
            Freeze
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            disabled={pending}
            onClick={() => {
              startTransition(() => {
                void unfreezeAccountAction(account.id);
              });
            }}
          >
            <Unlock className="mr-2 h-4 w-4" />
            Unfreeze
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          disabled={pending}
          className="text-red-600"
          onClick={() => {
            startTransition(() => {
              void closeAccountAction(account.id);
            });
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Close Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}