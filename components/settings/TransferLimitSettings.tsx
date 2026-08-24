"use client";

import { useState, useTransition } from "react";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  Banknote,
  CheckCircle2,
  Loader2,
  Save,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { updateCustomerTransferLimits } from "@/actions/settings/updateCustomerTransferLimits";

interface LimitGroup {
  maxPerTransaction: number;
  dailyLimit: number;
  monthlyLimit: number;
  bankMaxPerTransaction: number;
  bankDailyLimit: number;
  bankMonthlyLimit: number;
}

interface Props {
  limits: {
    ach: LimitGroup;
    wire: LimitGroup;
    zelle: LimitGroup;
  };
}

export default function TransferLimitSettings({
  limits,
}: Props) {
  const [values, setValues] =
    useState(limits);

  const [
    pending,
    startTransition,
  ] = useTransition();

  function update(
    type: "ach" | "wire" | "zelle",
    field:
      | "maxPerTransaction"
      | "dailyLimit"
      | "monthlyLimit",
    value: string
  ) {
    const number =
      Number(value);

    setValues((current) => ({
      ...current,
      [type]: {
        ...current[type],
        [field]: Number.isFinite(number)
          ? number
          : 0,
      },
    }));
  }

  function save() {
    startTransition(async () => {
      const result =
        await updateCustomerTransferLimits({
          ach: {
            maxPerTransaction:
              values.ach.maxPerTransaction,

            dailyLimit:
              values.ach.dailyLimit,

            monthlyLimit:
              values.ach.monthlyLimit,
          },

          wire: {
            maxPerTransaction:
              values.wire.maxPerTransaction,

            dailyLimit:
              values.wire.dailyLimit,

            monthlyLimit:
              values.wire.monthlyLimit,
          },

          zelle: {
            maxPerTransaction:
              values.zelle.maxPerTransaction,

            dailyLimit:
              values.zelle.dailyLimit,

            monthlyLimit:
              values.zelle.monthlyLimit,
          },
        });

      if (!result.success) {
        toast.error(
          result.message
        );
        return;
      }

      toast.success(
        result.message
      );
    });
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
            <ArrowLeftRight className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Transfer Limits
            </h2>

            <p className="text-sm text-slate-500">
              Set your personal limits for
              ACH, wire, and Zelle transfers.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">

        <LimitCard
          title="ACH Transfers"
          description="Manage your personal ACH transfer limits."
          icon={ArrowDownToLine}
          values={values.ach}
          onChange={(field, value) =>
            update(
              "ach",
              field,
              value
            )
          }
        />

        <LimitCard
          title="Wire Transfers"
          description="Manage your personal wire transfer limits."
          icon={Banknote}
          values={values.wire}
          onChange={(field, value) =>
            update(
              "wire",
              field,
              value
            )
          }
        />

        <LimitCard
          title="Zelle"
          description="Manage your personal Zelle transfer limits."
          icon={Zap}
          values={values.zelle}
          onChange={(field, value) =>
            update(
              "zelle",
              field,
              value
            )
          }
        />

        <div className="flex justify-end border-t border-slate-200 pt-6">
          <button
            type="button"
            disabled={pending}
            onClick={save}
            className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Limits
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}

function LimitCard({
  title,
  description,
  icon: Icon,
  values,
  onChange,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  values: LimitGroup;
  onChange: (
    field:
      | "maxPerTransaction"
      | "dailyLimit"
      | "monthlyLimit",
    value: string
  ) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <Icon className="h-5 w-5 text-emerald-600" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>

          <p className="text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <LimitInput
          label="Per transaction"
          value={
            values.maxPerTransaction
          }
          maximum={
            values.bankMaxPerTransaction
          }
          onChange={(value) =>
            onChange(
              "maxPerTransaction",
              value
            )
          }
        />

        <LimitInput
          label="Daily limit"
          value={values.dailyLimit}
          maximum={values.bankDailyLimit}
          onChange={(value) =>
            onChange(
              "dailyLimit",
              value
            )
          }
        />

        <LimitInput
          label="Monthly limit"
          value={values.monthlyLimit}
          maximum={
            values.bankMonthlyLimit
          }
          onChange={(value) =>
            onChange(
              "monthlyLimit",
              value
            )
          }
        />

      </div>

    </div>
  );
}

function LimitInput({
  label,
  value,
  maximum,
  onChange,
}: {
  label: string;
  value: number;
  maximum: number;
  onChange: (
    value: string
  ) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
          $
        </span>

        <input
          type="number"
          min={0}
          max={maximum}
          step="1"
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-8 pr-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <p className="mt-1 text-xs text-slate-500">
        Bank maximum: $
        {maximum.toLocaleString()}
      </p>
    </div>
  );
}