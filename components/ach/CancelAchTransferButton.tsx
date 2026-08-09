"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { cancelAchTransferAction } from "@/actions/ach/cancelAchTransferAction";

interface Props {
  reference: string;
}

export default function CancelAchTransferButton({
  reference,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this ACH transfer?"
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result =
        await cancelAchTransferAction(reference);

      if (!result.success) {
        alert(result.error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <Button
      variant="destructive"
      disabled={pending}
      onClick={handleCancel}
    >
      {pending
        ? "Cancelling..."
        : "Cancel Transfer"}
    </Button>
  );
}