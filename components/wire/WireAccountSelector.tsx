"use client";

import { Landmark, CheckCircle2 } from "lucide-react";

export interface WireAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  balance: number;
}

interface Props {
  accounts: WireAccount[];
  value: string;
  onChange: (value: string) => void;
}

export default function WireAccountSelector({
  accounts,
  value,
  onChange,
}: Props) {
  return (
    <section className="space-y-5">

      <div>

        <h2 className="text-lg font-bold text-slate-900">
          Funding Account
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the account that will fund this transfer.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {accounts.map((account) => {

          const selected =
            value === account.id;

          return (

            <button
              key={account.id}
              type="button"
              onClick={() =>
                onChange(account.id)
              }
              className={`
                relative rounded-2xl border p-5 text-left transition-all duration-200
                ${
                  selected
                    ? "border-emerald-500 bg-emerald-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md"
                }
              `}
            >

              {selected && (
                <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-emerald-600" />
              )}

              <div className="flex items-center gap-3">

                <div
                  className={`
                    flex h-12 w-12 items-center justify-center rounded-xl
                    ${
                      selected
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }
                  `}
                >
                  <Landmark className="h-6 w-6" />
                </div>

                <div className="min-w-0">

                  <h3 className="truncate text-lg font-semibold text-slate-900">
                    {account.accountName}
                  </h3>

                  <p className="text-sm text-slate-500">
                    •••• {account.accountNumber.slice(-4)}
                  </p>

                </div>

              </div>

              <div className="mt-5">

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Available Balance
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(account.balance)}
                </p>

              </div>

              <div className="mt-5 flex items-center justify-between">

                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  ACTIVE
                </span>

                <span className="text-xs text-slate-400">
                  FDIC Insured
                </span>

              </div>

            </button>

          );

        })}

      </div>

    </section>
  );
}