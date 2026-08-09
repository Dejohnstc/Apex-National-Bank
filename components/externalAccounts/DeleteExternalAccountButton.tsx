"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { deleteExternalAccountAction } from "@/actions/externalAccounts/deleteExternalAccountAction";

interface Props {
  id: string;
}

export default function DeleteExternalAccountButton({
  id,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  return (
    <Button
      variant="destructive"
      disabled={pending}
      onClick={() => {
        if (
          !window.confirm(
            "Delete this external account?"
          )
        ) {
          return;
        }

        startTransition(async () => {
          await deleteExternalAccountAction(id);
          router.refresh();
        });
      }}
    >
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
}