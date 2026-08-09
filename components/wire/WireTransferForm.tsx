"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { createWireTransferAction } from "@/actions/wire/createWireTransfer";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import WireAccountSelector from "./WireAccountSelector";
import WireTransferType from "./WireTransferType";
import WireRecipientForm from "./WireRecipientForm";
import WireSummary from "./WireSummary";
import WireReviewModal from "./WireReviewModal";

interface AccountOption {
  id: string;
  accountName: string;
  accountNumber: string;
  balance: number;
}

interface Props {
  accounts: AccountOption[];
}
export default function WireTransferForm({
  accounts,
}: Props) {
  const router = useRouter();

const [pending, startTransition] =
  useTransition();

const [reviewOpen, setReviewOpen] =
  useState(false);

const [accountId, setAccountId] =
  useState("");

const [type, setType] =
  useState<
    "DOMESTIC" | "INTERNATIONAL"
  >("DOMESTIC");

const [recipientName, setRecipientName] =
  useState("");

const [bankName, setBankName] =
  useState("");

const [accountNumber, setAccountNumber] =
  useState("");

const [routingNumber, setRoutingNumber] =
  useState("");

const [swiftCode, setSwiftCode] =
  useState("");

const [country, setCountry] =
  useState("");

const [amount, setAmount] =
  useState("");

const [purpose, setPurpose] =
  useState("");
  const fee =
  type === "DOMESTIC"
    ? 25
    : 45;

const amountNumber =
  Number(amount || 0);

const total =
  amountNumber + fee;

const selectedAccount =
  accounts.find(
    (account) =>
      account.id === accountId
  );
  function submit() {
  if (!accountId) {
    toast.error(
      "Select an account."
    );

    return;
  }

  if (!recipientName) {
    toast.error(
      "Recipient name is required."
    );

    return;
  }

  if (!bankName) {
    toast.error(
      "Bank name is required."
    );

    return;
  }

  if (!accountNumber) {
    toast.error(
      "Account number is required."
    );

    return;
  }

  if (amountNumber <= 0) {
    toast.error(
      "Enter a valid amount."
    );

    return;
  }

  setReviewOpen(true);
}
function confirmTransfer() {
  startTransition(async () => {

    const result =
      await createWireTransferAction({
        accountId,

        type,

        recipientName,

        bankName,

        accountNumber,

        routingNumber:
          type === "DOMESTIC"
            ? routingNumber
            : undefined,

        swiftCode:
          type === "INTERNATIONAL"
            ? swiftCode
            : undefined,

        country:
          type === "INTERNATIONAL"
            ? country
            : undefined,

        amount: amountNumber,

        purpose,
      });

    if (!result.success) {

      toast.error(result.message);

      return;

    }

    toast.success(
      "Wire transfer submitted successfully."
    );
    
window.dispatchEvent(
  new Event("refresh-notifications")
);
    router.push(
      `/dashboard/wires/${result.wireId}`
    );

  });
}
return (

<>

<WireReviewModal
  open={reviewOpen}
  onClose={() =>
    setReviewOpen(false)
  }
  onConfirm={confirmTransfer}
  pending={pending}
  senderAccount={
    selectedAccount?.accountName ??
    ""
  }
  senderBalance={
    selectedAccount?.balance ?? 0
  }
  recipient={recipientName}
  bank={bankName}
  amount={amountNumber}
  fee={fee}
  type={type}
/>

<div className="grid gap-8 xl:grid-cols-[1.6fr_420px]">

<Card className="rounded-3xl border shadow-xl">

  <div className="space-y-8 p-8">

    <WireAccountSelector
      accounts={accounts}
      value={accountId}
      onChange={setAccountId}
    />

    <WireTransferType
      value={type}
      onChange={setType}
    />

    <WireRecipientForm
      type={type}

      recipientName={recipientName}
      setRecipientName={setRecipientName}

      bankName={bankName}
      setBankName={setBankName}

      accountNumber={accountNumber}
      setAccountNumber={setAccountNumber}

      routingNumber={routingNumber}
      setRoutingNumber={setRoutingNumber}

      swiftCode={swiftCode}
      setSwiftCode={setSwiftCode}

      country={country}
      setCountry={setCountry}

      amount={amount}
      setAmount={setAmount}

      purpose={purpose}
      setPurpose={setPurpose}
    />

    <div className="flex justify-end border-t pt-8">

      <Button
        size="lg"
        className="h-14 min-w-[240px] rounded-2xl text-base font-semibold"
        disabled={pending}
        onClick={submit}
      >
        Review Transfer
      </Button>

    </div>

  </div>

</Card>

<WireSummary
  balance={selectedAccount?.balance ?? 0}
  amount={amountNumber}
  fee={fee}
  type={type}
/>

</div>

</>
);
}