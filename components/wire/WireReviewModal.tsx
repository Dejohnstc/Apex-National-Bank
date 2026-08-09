"use client";

import {
  AlertTriangle,
  ArrowRight,
  Building2,
  DollarSign,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;

  onClose: () => void;

  onConfirm: () => void;

  pending?: boolean;

  senderAccount: string;

  senderBalance: number;

  recipient: string;

  bank: string;

  amount: number;

  fee: number;

  type: "DOMESTIC" | "INTERNATIONAL";
}

export default function WireReviewModal({
  open,
  onClose,
  onConfirm,
  pending,

  senderAccount,
  senderBalance,

  recipient,
  bank,

  amount,
  fee,

  type,
}: Props) {
  if (!open) return null;

  const total = amount + fee;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

    <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

      {/* Header */}

      <div className="border-b bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 text-white">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
              Final Review
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Confirm Wire Transfer
            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-6 p-6">

        {/* Transfer Flow */}

        <div className="grid items-center gap-4 md:grid-cols-[1fr_50px_1fr]">

          <Card>

            <User className="mb-3 h-8 w-8 text-emerald-600" />

            <p className="text-xs uppercase tracking-wide text-slate-500">
              From Account
            </p>

            <h3 className="mt-1 text-lg font-semibold">
              {senderAccount}
            </h3>

            <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
              Available Balance
            </p>

            <div className="mt-1 text-xl font-bold text-emerald-700">
              ${senderBalance.toLocaleString()}
            </div>

          </Card>

          <div className="flex justify-center">

            <div className="rounded-full bg-slate-100 p-2">

              <ArrowRight className="h-5 w-5 text-slate-500" />

            </div>

          </div>

          <Card>

            <Building2 className="mb-3 h-8 w-8 text-blue-600" />

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Recipient
            </p>

            <h3 className="mt-1 text-lg font-semibold">
              {recipient}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {bank}
            </p>

          </Card>

        </div>

        {/* Summary */}

        <div className="rounded-2xl border bg-slate-50 p-5">

          <h3 className="mb-4 text-lg font-semibold">
            Transfer Summary
          </h3>

          <Row
            label="Transfer Type"
            value={type}
          />

          <Row
            label="Amount"
            value={`$${amount.toLocaleString()}`}
          />

          <Row
            label="Transfer Fee"
            value={`$${fee.toLocaleString()}`}
          />

          <div className="my-4 border-t" />

          <Row
            label="Total Debit"
            value={`$${total.toLocaleString()}`}
            large
          />

        </div>

        {/* Notice */}

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

          <div className="flex gap-3">

            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />

            <div>

              <h4 className="font-semibold text-amber-900">
                Verify Recipient Information
              </h4>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                Wire transfers are generally irreversible once processed.
                Carefully review the beneficiary, routing or SWIFT information,
                transfer amount and purpose before authorizing.
              </p>

            </div>

          </div>

        </div>

        {/* Security */}

        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

          <ShieldCheck className="h-6 w-6 text-emerald-600" />

          <div>

            <h4 className="text-sm font-semibold text-slate-900">
              Protected Transaction
            </h4>

            <p className="text-xs text-slate-600">
              AML Screening • Fraud Detection • 256-bit SSL Encryption
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="flex flex-col gap-3 border-t bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">

        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          disabled={pending}
          className="min-w-[180px]"
        >
          <DollarSign className="mr-2 h-4 w-4" />

          {pending
            ? "Submitting..."
            : "Authorize Transfer"}

        </Button>

      </div>

    </div>

  </div>
);

function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  large,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">

      <span className="text-sm font-medium text-slate-500">
        {label}
      </span>

      <span
        className={
          large
            ? "text-xl font-bold text-emerald-700"
            : "text-sm font-semibold text-slate-900"
        }
      >
        {value}
      </span>

    </div>
  );
}
}