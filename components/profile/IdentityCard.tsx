"use client";

import { useState } from "react";
import {
  Check,
  Copy,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface IdentityCardProps {
  profile: {
    customerId: string;

    accountNumber: string;

    routingNumber: string;

    accountType: string;

    accountStatus: string;

    currency?: string | null;

    availableBalance?: number | null;

    currentBalance?: number | null;

    kycStatus?: string | null;

    createdAt: string | null;

    openedAt?: string | null;
  };
}

export default function IdentityCard({
  profile,
}: IdentityCardProps) {
  const [copied, setCopied] =
    useState<string | null>(null);

  /*
   * Always fall back to USD if the account
   * does not have a currency value.
   */
  const currency =
    profile.currency || "USD";

  /*
   * Protect the UI from missing balance values.
   */
  const availableBalance =
    profile.availableBalance ?? 0;

  const currentBalance =
    profile.currentBalance ?? 0;

  const status =
    profile.kycStatus ?? "Pending";

  const badgeVariant =
    status === "VERIFIED"
      ? "default"
      : status === "REJECTED"
        ? "destructive"
        : "secondary";

  const formatter =
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    });

  async function copyValue(
    value: string,
    type: string
  ) {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        value
      );

      setCopied(type);

      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy:",
        error
      );
    }
  }

  return (
    <Card className="border-slate-200 shadow-sm">

      <CardHeader className="border-b bg-slate-50/70">

        <CardTitle className="text-xl font-bold text-slate-900">
          Banking Identity
        </CardTitle>

        <CardDescription>
          Your primary banking profile and account information.
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-5 pt-6">

        <Row
          label="Customer ID"
          value={profile.customerId}
        />

        {/* Account Number */}

        <CopyRow
          label="Account Number"
          value={profile.accountNumber}
          copied={
            copied === "accountNumber"
          }
          onCopy={() =>
            copyValue(
              profile.accountNumber,
              "accountNumber"
            )
          }
        />

        {/* Routing Number */}

        <CopyRow
          label="Routing Number"
          value={profile.routingNumber}
          copied={
            copied === "routingNumber"
          }
          onCopy={() =>
            copyValue(
              profile.routingNumber,
              "routingNumber"
            )
          }
        />

        <Row
          label="Account Type"
          value={profile.accountType}
        />

        <Row
          label="Account Status"
          value={
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              {profile.accountStatus}
            </Badge>
          }
        />

        <Row
          label="Currency"
          value={currency}
        />

        {/* Balances */}

        <div className="rounded-2xl border bg-slate-50 p-5">

          <div className="flex items-center justify-between">

            {/* Available Balance */}

            <div>

              <p className="text-sm text-slate-500">
                Available Balance
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-700">
                {formatter.format(
                  availableBalance
                )}
              </p>

            </div>

            {/* Current Balance */}

            <div className="text-right">

              <p className="text-sm text-slate-500">
                Current Balance
              </p>

              <p className="mt-1 text-xl font-semibold text-slate-900">
                {formatter.format(
                  currentBalance
                )}
              </p>

            </div>

          </div>

        </div>

        {/* Identity Verification */}

        <div className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3">

          <span className="text-sm text-slate-500">
            Identity Verification
          </span>

          <Badge variant={badgeVariant}>
            {status}
          </Badge>

        </div>

        {/* Account Opened */}

        <Row
          label="Account Opened"
          value={
            profile.openedAt
              ? new Date(
                  profile.openedAt
                ).toLocaleDateString()
              : "-"
          }
        />

        {/* Member Since */}

        <Row
          label="Member Since"
          value={
            profile.createdAt
              ? new Date(
                  profile.createdAt
                ).toLocaleDateString()
              : "-"
          }
        />

      </CardContent>

    </Card>
  );
}

interface CopyRowProps {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}

function CopyRow({
  label,
  value,
  copied,
  onCopy,
}: CopyRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">

      <span className="shrink-0 text-sm font-medium text-slate-500">
        {label}
      </span>

      <div className="flex min-w-0 items-center gap-3">

        <span className="break-all text-right font-semibold text-slate-900">
          {value || "-"}
        </span>

        {value && (
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600">
                  Copied
                </span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        )}

      </div>

    </div>
  );
}

interface RowProps {
  label: string;
  value: React.ReactNode;
}

function Row({
  label,
  value,
}: RowProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">

      <span className="text-sm font-medium text-slate-500">
        {label}
      </span>

      <span className="text-right font-semibold text-slate-900">
        {value}
      </span>

    </div>
  );
}