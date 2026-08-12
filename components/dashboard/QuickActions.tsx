"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowRight,
  ArrowRightLeft,
  Landmark,
  CreditCard,
  Receipt,
  Wallet,
  Users,
  Building2,
  Zap,
  ChevronDown,
  ChevronUp,
  Smartphone,
  FileText,
} from "lucide-react";

const actions = [
  {
    title: "Accounts",
    description: "View balances & activity",
    icon: Wallet,
    href: "/dashboard/accounts",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Wire Transfer",
    description: "Domestic & International",
    icon: Landmark,
    href: "/dashboard/wires",
    color: "from-emerald-600 to-emerald-700",
  },
  {
    title: "ACH Transfer",
    description: "Bank to Bank",
    icon: Building2,
    href: "/dashboard/ach",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Internal Transfer",
    description: "Move between accounts",
    icon: ArrowRightLeft,
    href: "/dashboard/transfers",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    title: "Zelle®",
    description: "Send money instantly",
    icon: Zap,
    href: "/dashboard/zelle",
    color: "from-violet-600 to-purple-700",
  },
  {
    title: "Bill Payments",
    description: "Pay bills from your account",
    icon: FileText,
    href: "/dashboard/bill-payments",
    color: "from-rose-500 to-red-600",
  },
  {
    title: "Mobile Check Deposit",
    description: "Deposit checks from your phone",
    icon: Smartphone,
    href: "/dashboard/mobile-check-deposit",
    color: "from-teal-500 to-emerald-600",
  },
  {
    title: "Cards",
    description: "Debit & Virtual Cards",
    icon: CreditCard,
    href: "/dashboard/cards",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Recipients",
    description: "Saved beneficiaries",
    icon: Users,
    href: "/dashboard/beneficiaries",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Statements",
    description: "Documents & history",
    icon: Receipt,
    href: "/dashboard/statements",
    color: "from-slate-700 to-slate-900",
  },
];

export function QuickActions() {
  const [expanded, setExpanded] =
    useState(false);

  const DEFAULT_COUNT = 4;

  const visibleActions = expanded
    ? actions
    : actions.slice(0, DEFAULT_COUNT);

  const remaining =
    actions.length - DEFAULT_COUNT;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Fast access to your most frequently
          used banking services.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {visibleActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {action.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-700">
                  Open
                </span>

                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700" />
              </div>
            </Link>
          );
        })}
      </div>

      {remaining > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() =>
              setExpanded((prev) => !prev)
            }
            className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                View {remaining} More Services
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}