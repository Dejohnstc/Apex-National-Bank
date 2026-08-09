"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { acceptZelleRequestAction } from "@/actions/zelle/acceptZelleRequest";

interface Props {
  requestId: string;
}

export default function AcceptRequestButton({
  requestId,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  function accept() {
    startTransition(async () => {
      const result =
        await acceptZelleRequestAction({
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
      onClick={accept}
      disabled={pending}
      className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
    >
      {pending
        ? "Processing..."
        : "Accept"}
    </button>
  );
}