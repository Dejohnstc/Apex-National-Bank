"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { declineZelleRequestAction } from "@/actions/zelle/declineZelleRequest";

interface Props {
  requestId: string;
}

export default function DeclineRequestButton({
  requestId,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  function decline() {
    startTransition(async () => {
      const result =
        await declineZelleRequestAction({
          requestId,
        });

      if (!result.success) {
        alert(result.message);
        return;
      }

      router.refresh();
    });
  }

  return (
    <button
      onClick={decline}
      disabled={pending}
      className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
    >
      {pending
        ? "Processing..."
        : "Decline"}
    </button>
  );
}