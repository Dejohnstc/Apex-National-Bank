"use client";

import {
  DollarSign,
  Receipt,
  CreditCard,
  CalendarDays,
  Landmark,
  FileText,
} from "lucide-react";

import type {
  ReceiptSummary as ReceiptSummaryType,
} from "./types";
import { Hash } from "lucide-react";
import {
  formatMoney,
  formatDate,
} from "./helper";

interface Props {
  summary: ReceiptSummaryType;
}

export function ReceiptSummary({
  summary,
}: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      {/* Header */}

      <div className="border-b bg-gradient-to-r from-slate-50 to-white px-6 py-5">

        <div className="flex items-center gap-3">

          <Receipt className="h-6 w-6 text-emerald-600" />

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Transaction Summary
            </h2>

            <p className="text-sm text-slate-500">
              Official details of this banking transaction.
            </p>

          </div>

        </div>

      </div>

      {/* Amount Cards */}

      <div className="grid gap-4 border-b bg-slate-50 p-6 sm:grid-cols-3">

        <AmountCard
          title="Transfer Amount"
          value={formatMoney(
            summary.amount,
            summary.currency
          )}
          icon={<DollarSign className="h-6 w-6" />}
        />

        <AmountCard
          title="Transfer Fee"
          value={formatMoney(
            summary.fee,
            summary.currency
          )}
          icon={<CreditCard className="h-6 w-6" />}
        />

        <AmountCard
          title="Total Debited"
          value={formatMoney(
            summary.total,
            summary.currency
          )}
          icon={<Landmark className="h-6 w-6" />}
          highlight
        />

      </div>

      {/* Details */}

      <div className="grid gap-5 p-6 md:grid-cols-2">

        <SummaryRow
          icon={<Receipt className="h-5 w-5 text-emerald-600" />}
          label="Transfer Reference"
          value={summary.reference}
        />

        <SummaryRow
          icon={<Receipt className="h-5 w-5 text-emerald-600" />}
          label="Confirmation Number"
          value={
            summary.confirmationNumber ??
            "Pending"
          }
        />

        <SummaryRow
          icon={<CreditCard className="h-5 w-5 text-emerald-600" />}
          label="Transaction Reference"
          value={
            summary.transactionReference ??
            "-"
          }
        />


<SummaryRow
  label="Wire Trace Number"
  value={summary.traceNumber ?? "-"}
  icon={<Hash className="h-4 w-4" />}
/>
        <SummaryRow
          icon={<Landmark className="h-5 w-5 text-emerald-600" />}
          label="Transfer Type"
          value={summary.type}
        />

        <SummaryRow
          icon={<CalendarDays className="h-5 w-5 text-emerald-600" />}
          label="Submitted"
          value={formatDate(summary.submittedAt)}
        />

        <SummaryRow
          icon={<CalendarDays className="h-5 w-5 text-emerald-600" />}
          label="Effective Date"
          value={formatDate(summary.effectiveDate)}
        />

        <SummaryRow
          icon={<CalendarDays className="h-5 w-5 text-emerald-600" />}
          label="Completed"
          value={formatDate(summary.completedAt)}
        />

        <SummaryRow
          icon={<FileText className="h-5 w-5 text-emerald-600" />}
          label="Purpose"
          value={
            summary.purpose ||
            "No purpose provided"
          }
        />

      </div>

    </section>
  );
}

interface AmountCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

function AmountCard({
  title,
  value,
  icon,
  highlight = false,
}: AmountCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        highlight
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">

        <span className="text-sm font-medium text-slate-500">
          {title}
        </span>

        <div className="text-emerald-600">
          {icon}
        </div>

      </div>

      <div
        className={`break-all text-2xl font-bold ${
          highlight
            ? "text-emerald-700"
            : "text-slate-900"
        }`}
      >
        {value}
      </div>

    </div>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function SummaryRow({
  label,
  value,
  icon,
}: SummaryRowProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

      <div className="mb-3 flex items-center gap-2">

        {icon}

        <span className="text-sm font-medium text-slate-600">
          {label}
        </span>

      </div>

      <div className="break-all font-mono text-base font-semibold text-slate-900">
        {value}
      </div>

    </div>
  );
}