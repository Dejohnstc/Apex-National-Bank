"use client";

import {
  DollarSign,
  Landmark,
  ShieldCheck,
  Clock3,
  Wallet,
} from "lucide-react";

interface Props {
  balance: number;
  amount: number;
  fee: number;
  type: "DOMESTIC" | "INTERNATIONAL";
}

export default function WireSummary({
  balance,
  amount,
  fee,
  type,
}: Props) {
  const total = amount + fee;

  const remaining = balance - total;

  return (
    <aside className="sticky top-24 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white">

        <div className="flex items-center gap-3">

          <Wallet className="h-7 w-7" />

          <div>

            <h2 className="text-xl font-bold">
              Transfer Summary
            </h2>

            <p className="text-sm text-emerald-100">
              Live calculation
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-5 p-6">

        <SummaryRow
          icon={<Wallet className="h-5 w-5" />}
          label="Available Balance"
          value={money(balance)}
        />

        <SummaryRow
          icon={<DollarSign className="h-5 w-5" />}
          label="Transfer Amount"
          value={money(amount)}
        />

        <SummaryRow
          icon={<Landmark className="h-5 w-5" />}
          label="Wire Fee"
          value={money(fee)}
        />

        <div className="border-t pt-5">

          <SummaryRow
            highlight
            icon={<DollarSign className="h-6 w-6" />}
            label="Total Debit"
            value={money(total)}
          />

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <p className="text-sm text-slate-500">
            Remaining Balance
          </p>

          <div
            className={`mt-2 text-3xl font-bold ${
              remaining >= 0
                ? "text-emerald-700"
                : "text-red-600"
            }`}
          >
            {money(remaining)}
          </div>

        </div>

        <div className="rounded-2xl border bg-emerald-50 p-5">

          <div className="flex items-center gap-3">

            <Clock3 className="h-5 w-5 text-emerald-600" />

            <div>

              <p className="font-semibold">
                Estimated Delivery
              </p>

              <p className="text-sm text-slate-600">
                {type === "DOMESTIC"
                  ? "Next Business Day"
                  : "1–5 Business Days"}
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-2xl border bg-slate-50 p-5">

          <div className="flex items-start gap-3">

            <ShieldCheck className="mt-1 h-5 w-5 text-emerald-600" />

            <div>

              <p className="font-semibold">
                Protected Transfer
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Protected by fraud detection,
                AML screening and
                bank-grade encryption.
              </p>

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}

interface RowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function SummaryRow({
  icon,
  label,
  value,
  highlight,
}: RowProps) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-slate-100 p-2">

          {icon}

        </div>

        <span
          className={
            highlight
              ? "font-semibold"
              : "text-slate-600"
          }
        >
          {label}
        </span>

      </div>

      <span
        className={
          highlight
            ? "text-xl font-bold"
            : "font-semibold"
        }
      >
        {value}
      </span>

    </div>
  );
}

function money(value: number) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  ).format(value);
}