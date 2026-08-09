"use client";

import { useTransition } from "react";

import {
  MoreHorizontal,
  Lock,
  Unlock,
  Ban,
  RefreshCw,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import type { CardStatus } from "@/services/admin/cards";

import {
  freezeCardAction,
  unfreezeCardAction,
  cancelCardAction,
  replaceCardAction,
} from "@/actions/admin/cards/actions";

interface Props {
  id: string;

  status: CardStatus;
}

export function CardRowActions({
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
    size="icon"
    variant="ghost"
  >
    <MoreHorizontal className="h-4 w-4" />
  </Button>
</DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {status === "ACTIVE" && (
          <DropdownMenuItem
            disabled={pending}
            onClick={() =>
              startTransition(() => {
                void freezeCardAction(
                  id
                );
              })
            }
          >
            <Lock className="mr-2 h-4 w-4" />
            Freeze
          </DropdownMenuItem>
        )}

        {status === "FROZEN" && (
          <DropdownMenuItem
            disabled={pending}
            onClick={() =>
              startTransition(() => {
                void unfreezeCardAction(
                  id
                );
              })
            }
          >
            <Unlock className="mr-2 h-4 w-4" />
            Unfreeze
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          disabled={pending}
          onClick={() =>
            startTransition(() => {
              void replaceCardAction(
                id
              );
            })
          }
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Replace
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={pending}
          onClick={() =>
            startTransition(() => {
              void cancelCardAction(
                id
              );
            })
          }
        >
          <Ban className="mr-2 h-4 w-4" />
          Block
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}