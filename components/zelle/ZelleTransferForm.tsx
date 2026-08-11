"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Mail,
  ShieldCheck,
} from "lucide-react";

import RecipientPreview from "./RecipientPreview";
import TransferReceipt from "./TransferReceipt";

import { createZelleTransferAction } from "@/actions/zelle/createZelleTransfer";

interface Account {
  id: string;
  accountNumber: string;
  accountName: string;
  balance: number;
}

interface Recipient {
  fullName: string;
  email: string;
  accountId: string;
  accountNumber: string;
  accountType: string;
}

interface Props {
  accounts: Account[];
}

export default function ZelleTransferForm({
  accounts,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const [recipient, setRecipient] =
    useState<Recipient | null>(null);

  const [form, setForm] = useState({
    accountId: accounts[0]?.id ?? "",
    recipientEmail: "",
    amount: "",
    memo: "",
  });

  const [reviewing, setReviewing] =
    useState(false);

  const [receiptOpen, setReceiptOpen] =
    useState(false);

  const [receipt, setReceipt] = useState({
    amount: 0,
    recipientName: "",
    recipientEmail: "",
    accountName: "",
    memo: "",
    reference: "",
  });

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const selectedAccount = useMemo(
    () =>
      accounts.find(
        (account) =>
          account.id === form.accountId
      ),
    [accounts, form.accountId]
  );

  const amount = Number(form.amount);

  const formattedAmount =
    amount > 0
      ? amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        })
      : "$0.00";

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleReview() {
    setMessage("");
    setSuccess(false);

    if (!selectedAccount) {
      setMessage("Select a valid account.");
      return;
    }

    if (!recipient) {
      setMessage("Select a valid recipient.");
      return;
    }

    if (!form.recipientEmail.trim()) {
      setMessage("Enter a recipient email.");
      return;
    }

    if (!amount || amount <= 0) {
      setMessage("Enter a valid amount.");
      return;
    }

    if (amount > selectedAccount.balance) {
      setMessage("Insufficient funds.");
      return;
    }

    setReviewing(true);
  }

  function handleBack() {
    if (pending) {
      return;
    }

    setReviewing(false);
    setMessage("");
    setSuccess(false);
  }

  function handleConfirm() {
    if (!recipient || !selectedAccount) {
      setMessage(
        "The transfer information is incomplete."
      );
      return;
    }

    setMessage("");
    setSuccess(false);

    startTransition(async () => {
      const result =
        await createZelleTransferAction({
          accountId: form.accountId,
          recipientEmail:
            form.recipientEmail,
          amount,
          memo: form.memo,
        });

      if (!result.success) {
        setSuccess(false);
        setMessage(
          result.message ??
            "Transfer failed."
        );
        return;
      }

      setReceipt({
        amount,

        recipientName:
          recipient.fullName,

        recipientEmail:
          recipient.email,

        accountName:
          selectedAccount.accountName,

        memo: form.memo,

        reference:
          result.reference ??
          `ZL-${Date.now()}`,
      });

      setReviewing(false);

      setReceiptOpen(true);

      setSuccess(true);
      setMessage("");

      setForm({
        accountId: form.accountId,
        recipientEmail: "",
        amount: "",
        memo: "",
      });

      setRecipient(null);

      router.refresh();
    });
  }

  /*
   * ============================
   * REVIEW SCREEN
   * ============================
   */

  if (reviewing) {
    return (
      <>
        <div className="rounded-2xl border bg-white shadow-sm">

          {/* Header */}

          <div className="border-b px-5 py-5 sm:px-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={pending}
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Edit Transfer
            </button>

            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-emerald-100 p-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-700" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Review Zelle Transfer
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Please review the details before
                  sending your money.
                </p>
              </div>
            </div>
          </div>

          {/* Transfer Details */}

          <div className="space-y-5 p-5 sm:p-6">

            {/* From */}

            <div className="rounded-2xl border bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                From Account
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {selectedAccount?.accountName}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    ••••{selectedAccount?.accountNumber.slice(-4)}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-semibold text-slate-700">
                  {selectedAccount?.balance.toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )}
                </p>
              </div>
            </div>

            {/* Recipient */}

            <div className="rounded-2xl border bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Recipient
              </p>

              <div className="mt-3 flex items-center gap-3">
                <div className="rounded-xl bg-white p-2.5 shadow-sm">
                  <Mail className="h-5 w-5 text-slate-600" />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {recipient?.fullName}
                  </p>

                  <p className="truncate text-sm text-slate-500">
                    {recipient?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Amount */}

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Transfer Amount
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {formattedAmount}
              </p>
            </div>

            {/* Memo */}

            {form.memo.trim() && (
              <div className="rounded-2xl border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Memo
                </p>

                <p className="mt-2 text-sm text-slate-700">
                  {form.memo}
                </p>
              </div>
            )}

            {/* Fee / Total */}

            <div className="space-y-3 rounded-2xl border p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Transfer amount
                </span>

                <span className="font-semibold text-slate-900">
                  {formattedAmount}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Fee
                </span>

                <span className="font-semibold text-emerald-600">
                  $0.00
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">
                    Total
                  </span>

                  <span className="text-xl font-bold text-slate-900">
                    {formattedAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Notice */}

            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

              <p className="text-xs leading-5 text-slate-500">
                Your transfer will be securely
                validated before the money is
                sent. Make sure the recipient
                information and amount are correct.
              </p>
            </div>

            {/* Error */}

            {message && (
              <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
                {message}
              </div>
            )}

            {/* Actions */}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={handleBack}
                disabled={pending}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pending
                  ? "Sending..."
                  : "Confirm & Send"}

                {!pending && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

            </div>

          </div>
        </div>

        <TransferReceipt
          open={receiptOpen}
          onClose={() =>
            setReceiptOpen(false)
          }
          amount={receipt.amount}
          recipientName={
            receipt.recipientName
          }
          recipientEmail={
            receipt.recipientEmail
          }
          accountName={
            receipt.accountName
          }
          memo={receipt.memo}
          reference={
            receipt.reference
          }
        />
      </>
    );
  }

  /*
   * ============================
   * SEND FORM
   * ============================
   */

  return (
    <>
      <div className="space-y-6 rounded-xl border bg-white p-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            From Account
          </label>

          <select
            className="w-full rounded-lg border p-3"
            value={form.accountId}
            onChange={(e) =>
              update(
                "accountId",
                e.target.value
              )
            }
          >
            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.accountName} ••••
                {account.accountNumber.slice(-4)}
              </option>
            ))}
          </select>

          {selectedAccount && (
            <p className="mt-2 text-sm text-gray-500">
              Available Balance: $
              {selectedAccount.balance.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Recipient Email
          </label>

          <input
            type="email"
            className="w-full rounded-lg border p-3"
            placeholder="name@example.com"
            value={form.recipientEmail}
            onChange={(e) =>
              update(
                "recipientEmail",
                e.target.value
              )
            }
          />
        </div>

        <RecipientPreview
          email={form.recipientEmail}
          onRecipientFound={
            setRecipient
          }
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Amount
          </label>

          <input
            type="number"
            className="w-full rounded-lg border p-3"
            placeholder="0.00"
            min={1}
            step="0.01"
            value={form.amount}
            onChange={(e) =>
              update(
                "amount",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Memo (Optional)
          </label>

          <textarea
            rows={3}
            className="w-full rounded-lg border p-3"
            placeholder="What's this payment for?"
            value={form.memo}
            onChange={(e) =>
              update(
                "memo",
                e.target.value
              )
            }
          />
        </div>

        {message && (
          <div
            className={`rounded-lg p-3 text-sm ${
              success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="button"
          disabled={pending}
          onClick={handleReview}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 font-medium text-white transition hover:bg-black/90 disabled:opacity-50"
        >
          Review Transfer
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <TransferReceipt
        open={receiptOpen}
        onClose={() =>
          setReceiptOpen(false)
        }
        amount={receipt.amount}
        recipientName={
          receipt.recipientName
        }
        recipientEmail={
          receipt.recipientEmail
        }
        accountName={
          receipt.accountName
        }
        memo={receipt.memo}
        reference={
          receipt.reference
        }
      />
    </>
  );
}