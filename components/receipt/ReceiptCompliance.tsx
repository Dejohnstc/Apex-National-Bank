"use client";

import {
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  CalendarClock,
  UserCircle2,
} from "lucide-react";

import type {
  ReceiptCompliance as Compliance,
} from "./types";

interface Props {
  compliance?: Compliance;
}

export function ReceiptCompliance({
  compliance,
}: Props) {
  if (!compliance) return null;

  const risk =
    compliance.riskStatus ?? "CLEAR";

  const aml =
    compliance.amlStatus ?? "CLEAR";

  const riskColor =
    risk === "CLEAR"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : "text-red-700 bg-red-50 border-red-200";

  const amlColor =
    aml === "CLEAR"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : "text-orange-700 bg-orange-50 border-orange-200";

  return (
    <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      {/* Header */}

      <div className="border-b bg-gradient-to-r from-slate-50 to-white px-6 py-5">

        <div className="flex items-center gap-3">

          <ShieldCheck className="h-6 w-6 text-emerald-600" />

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Compliance & Security Review
            </h2>

            <p className="text-sm text-slate-500">
              Regulatory review information for this transaction.
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="grid gap-5 p-6 sm:grid-cols-2">

        <StatusCard
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Risk Assessment"
          value={risk}
          className={riskColor}
        />

        <StatusCard
          icon={<BadgeCheck className="h-5 w-5" />}
          title="AML Screening"
          value={aml}
          className={amlColor}
        />

        <InfoCard
          icon={<UserCircle2 className="h-5 w-5 text-slate-500" />}
          label="Reviewed By"
          value={
            compliance.reviewedBy ??
            "Automated Banking System"
          }
        />

        <InfoCard
          icon={<CalendarClock className="h-5 w-5 text-slate-500" />}
          label="Review Date"
          value={
            compliance.reviewDate ??
            "Automatically reviewed"
          }
        />

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-6 py-4">

        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

          <ShieldAlert className="mt-0.5 h-5 w-5 text-emerald-600" />

          <div>

            <p className="font-semibold text-emerald-800">
              Security Verification
            </p>

            <p className="mt-1 text-sm text-emerald-700">
              This transaction has been processed through Apex National Bank&apos;s
              fraud monitoring, AML screening, and internal compliance systems.
              Verification details are retained for audit and regulatory
              purposes.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

interface StatusCardProps {
  title: string;
  value: string;
  className: string;
  icon: React.ReactNode;
}

function StatusCard({
  title,
  value,
  className,
  icon,
}: StatusCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${className}`}>

      <div className="mb-3 flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">
          {title}
        </span>
      </div>

      <div className="text-xl font-bold">
        {value}
      </div>

    </div>
  );
}

interface InfoCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function InfoCard({
  label,
  value,
  icon,
}: InfoCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

      <div className="mb-3 flex items-center gap-2">
        {icon}

        <span className="text-sm font-medium text-slate-600">
          {label}
        </span>
      </div>

      <div className="text-base font-semibold text-slate-900">
        {value}
      </div>

    </div>
  );
}