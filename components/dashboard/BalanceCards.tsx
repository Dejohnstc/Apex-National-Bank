"use client";

import {
  Landmark,
  PiggyBank,
  Wallet,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

interface Account {
  _id?: string;
  type:
    | "CHECKING"
    | "SAVINGS"
    | "INVESTMENT"
    | "CREDIT";
  availableBalance: number;
}

interface BalanceCardsProps {
  accounts: Account[];
  totalBalance: number;
}

const icons = {
  CHECKING: Landmark,
  SAVINGS: PiggyBank,
  INVESTMENT: Wallet,
  CREDIT: DollarSign,
};

const colors = {
  CHECKING:
    "from-sky-500 to-blue-700",

  SAVINGS:
    "from-emerald-500 to-green-700",

  INVESTMENT:
    "from-violet-500 to-indigo-700",

  CREDIT:
    "from-amber-500 to-orange-600",
};

export function BalanceCards({
  accounts,
  totalBalance,
}: BalanceCardsProps) {
  return (
    <section className="space-y-8">

      {/* Hero Balance */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-2xl sm:p-8 lg:p-10">

        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <ShieldCheck
                size={18}
                className="text-emerald-400"
              />

              <span className="text-sm text-emerald-300">
                FDIC Insured
              </span>

            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-slate-300">
              Total Available Balance
            </p>

            <h1 className="mt-3 break-all text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              $
              {totalBalance.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-300">
              Combined available balance
              across all of your Apex
              National Bank accounts.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">

              <p className="text-xs uppercase tracking-wider text-slate-300">
                Accounts
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {accounts.length}
              </h2>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">

              <p className="text-xs uppercase tracking-wider text-slate-300">
                Status
              </p>

              <h2 className="mt-2 text-xl font-bold text-emerald-400">
                Active
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Account Cards */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {accounts.map((account) => {
          const Icon =
            icons[account.type];

          return (
            <div
              key={account._id}
              className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

            <div
  className={`h-1 bg-gradient-to-r ${colors[account.type]}`}
/>

              <div className="p-5">

                <div className="flex items-start justify-between">

                  <div
  className={`rounded-2xl bg-gradient-to-br p-2.5 text-white ${colors[account.type]}`}
>
  <Icon size={22} />
</div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Active
                  </span>

                </div>

                <div className="mt-5">

  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
    {account.type}
  </p>

  <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
    $
    {account.availableBalance.toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
      }
    )}
  </h3>

  <div className="mt-4 flex items-center justify-between border-t pt-3">

    <span className="text-sm text-slate-500">
      Available Balance
    </span>

    <button className="flex items-center gap-1 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">

      View Details

      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

    </button>

  </div>

</div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}