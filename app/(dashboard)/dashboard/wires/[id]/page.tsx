import { notFound } from "next/navigation";
import mongoose from "mongoose";

import { buildWireReceipt } from "@/services/receipt/buildWireReceipt";

import { ReceiptLayout } from "@/components/receipt/ReceiptLayout";
import { ReceiptStatus } from "@/components/receipt/ReceiptStatus";
import ReceiptActionsClient from "@/components/receipt/ReceiptActionsClient";
import { ReceiptSummary } from "@/components/receipt/ReceiptSummary";
import { ReceiptAccounts } from "@/components/receipt/ReciptAccounts";
import { ReceiptTimeline } from "@/components/receipt/ReceiptTimeline";
import { ReceiptCompliance } from "@/components/receipt/ReceiptCompliance";
import { ReceiptQRCode } from "@/components/receipt/ReceiptQRCode";
import { ReceiptFooter } from "@/components/receipt/ReceiptFooter";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function WireReceiptPage({
  params,
}: Props) {
  const { id } = await params;

  // Prevent MongoDB CastError
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  let receipt;

  try {
    receipt = await buildWireReceipt(id);
  } catch {
    notFound();
  }

  return (
    <ReceiptLayout
      title={receipt.bank.receiptType}
      subtitle="Official electronic confirmation of your completed wire transfer."
      status={
        <ReceiptStatus
          status={receipt.raw.status}
        />
      }
      actions={
  <ReceiptActionsClient id={id} />
}
      
    >
      <ReceiptSummary
        summary={receipt.summary}
      />

      <ReceiptAccounts
        sender={receipt.sender}
        recipient={receipt.recipient}
      />

     <ReceiptTimeline
  items={receipt.timeline}
/>

      <ReceiptCompliance
        compliance={receipt.compliance}
      />

      <ReceiptQRCode
        reference={receipt.summary.reference}
        confirmation={
          receipt.summary.confirmationNumber
        }
      />

      <ReceiptFooter />
    </ReceiptLayout>
  );
}