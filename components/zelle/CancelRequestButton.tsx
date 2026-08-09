"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { XCircle } from "lucide-react";

import { cancelZelleRequestAction } from "@/actions/zelle/cancelZelleRequest";

interface Props {
  requestId: string;
}

export default function CancelRequestButton({
  requestId,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  return (
    <button
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const result =
            await cancelZelleRequestAction({
              requestId,
            });

          if (result.success) {
            router.refresh();
          } else {
            alert(result.message);
          }
        })
      }
      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-red-50 disabled:opacity-50"
    >
      <XCircle className="h-4 w-4" />
      {pending ? "Cancelling..." : "Cancel"}
    </button>
  );
}