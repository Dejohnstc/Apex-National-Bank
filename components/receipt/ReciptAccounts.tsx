"use client";

import {
  Building2,
  User,
  Landmark,
  Globe2,
  Hash,
  ShieldCheck,
} from "lucide-react";

import type { ReceiptParty } from "./types";

import { maskAccount } from "./helper";

interface Props {
  sender: ReceiptParty;
  recipient: ReceiptParty;
}

export function ReceiptAccounts({
  sender,
  recipient,
}: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      {/* Header */}

      <div className="border-b bg-gradient-to-r from-slate-50 to-white px-6 py-5">

        <h2 className="text-xl font-bold text-slate-900">
          Transfer Participants
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Originating and beneficiary account information.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-6 p-6 lg:grid-cols-2">

        <PartyCard
          title="Sender Account"
          subtitle="Funds debited from this account."
          badge="Originating Bank"
          party={sender}
          accent="emerald"
        />

        <PartyCard
          title="Recipient Account"
          subtitle="Destination of transferred funds."
          badge="Beneficiary Bank"
          party={recipient}
          accent="blue"
        />

      </div>

    </section>
  );
}

interface PartyCardProps {
  title: string;
  subtitle: string;
  badge: string;
  party: ReceiptParty;
  accent: "emerald" | "blue";
}

function PartyCard({
  title,
  subtitle,
  badge,
  party,
  accent,
}: PartyCardProps) {
  const accentClasses =
    accent === "emerald"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className={`border-b px-6 py-5 ${accentClasses}`}>

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-lg font-bold">
              {title}
            </h3>

            <p className="mt-1 text-sm opacity-80">
              {subtitle}
            </p>

          </div>

          <span className="rounded-full border bg-white/70 px-3 py-1 text-xs font-semibold">
            {badge}
          </span>

        </div>

      </div>

      <div className="space-y-4 p-6">

        <Field
          icon={<User className="h-5 w-5 text-emerald-600" />}
          label="Account Holder"
          value={party.name}
        />

        <Field
          icon={<Building2 className="h-5 w-5 text-emerald-600" />}
          label="Financial Institution"
          value={
            party.bank ??
            "Apex National Bank"
          }
        />

        <Field
          icon={<Hash className="h-5 w-5 text-emerald-600" />}
          label="Account Number"
          value={maskAccount(
            party.accountNumber
          )}
          mono
        />

        <Field
          icon={<Landmark className="h-5 w-5 text-emerald-600" />}
          label="Routing Number"
          value={
            party.routingNumber ??
            "—"
          }
          mono
        />

        <Field
          icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}
          label="SWIFT / BIC"
          value={
            party.swiftCode ??
            "Domestic Transfer"
          }
          mono
        />

        <Field
          icon={<Globe2 className="h-5 w-5 text-emerald-600" />}
          label="Country"
          value={
            party.country ??
            "United States"
          }
        />

      </div>

    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  mono?: boolean;
}

function Field({
  label,
  value,
  icon,
  mono = false,
}: FieldProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

      <div className="mb-2 flex items-center gap-2">

        {icon}

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </span>

      </div>

      <div
        className={`break-all text-base font-semibold text-slate-900 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </div>

    </div>
  );
}