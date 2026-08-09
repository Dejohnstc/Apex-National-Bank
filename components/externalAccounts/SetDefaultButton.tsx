"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { setDefaultExternalAccountAction } from "@/actions/externalAccounts/setDefaultExternalAccountAction";

interface Props {
  id: string;
}

export default function SetDefaultButton({
  id,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  return (
    <Button
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await setDefaultExternalAccountAction(
            id
          );

          router.refresh();
        })
      }
    >
      {pending
        ? "Saving..."
        : "Set Default"}
    </Button>
  );
}