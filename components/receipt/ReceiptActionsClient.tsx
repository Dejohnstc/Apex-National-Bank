"use client";

import { useRouter } from "next/navigation";

import { ReceiptActions } from "./ReceiptActions";

interface Props {
  id: string;
}

export default function ReceiptActionsClient({
  id,
}: Props) {
  const router = useRouter();

  return (
    <ReceiptActions
      onBack={() => router.push("/dashboard/transactions")}
      onPrint={() => window.print()}
      onDownload={() => {
        window.location.href =
          `/dashboard/wires/${id}/pdf`;
      }}
      onEmail={() => {
        window.location.href =
          `/api/receipt/wire/${id}/email`;
      }}
    />
  );
}