"use client";

import Link from "next/link";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

interface Transaction {
  _id?: string;

  description: string;

  amount: number;

  direction: "DEBIT" | "CREDIT";

  status?:
    | "PENDING"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED"
    | "REJECTED"
    | "RETURNED"
    | "CANCELLED";

  createdAt?: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const statusColors = {
  COMPLETED:
    "bg-emerald-100 text-emerald-700",

  PROCESSING:
    "bg-blue-100 text-blue-700",

  PENDING:
    "bg-yellow-100 text-yellow-700",

  FAILED:
    "bg-red-100 text-red-700",

  REJECTED:
    "bg-red-100 text-red-700",

  RETURNED:
    "bg-orange-100 text-orange-700",

  CANCELLED:
    "bg-slate-200 text-slate-700",
};

export function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  const latest =
    transactions.slice(0,2);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest account activity
          </p>

        </div>

        <Link
          href="/dashboard/transactions"
          className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          View All
        </Link>

      </div>

      <div className="divide-y divide-slate-100">

        {latest.length === 0 && (

          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <Clock3 className="mb-4 h-10 w-10 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-900">
              No Transactions
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Your recent activity will appear here.
            </p>

          </div>

        )}

        {latest.map((tx) => (

          <div
            key={tx._id}
            className="flex items-center justify-between px-6 py-5 transition hover:bg-slate-50"
          >

            <div className="flex items-center gap-4">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  tx.direction === "CREDIT"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >

                {tx.direction === "CREDIT" ? (
                  <ArrowDownLeft size={22} />
                ) : (
                  <ArrowUpRight size={22} />
                )}

              </div>

              <div>

                <h3 className="font-semibold text-slate-900">
                  {tx.description}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-3">

                  <span className="text-sm text-slate-500">
                    {tx.createdAt
                      ? new Date(
                          tx.createdAt
                        ).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          }
                        )
                      : ""}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusColors[
                        tx.status ??
                          "COMPLETED"
                      ]
                    }`}
                  >
                    {tx.status ??
                      "COMPLETED"}
                  </span>

                </div>

              </div>

            </div>

            <div className="text-right">

              <p
                className={`text-lg font-bold ${
                  tx.direction ===
                  "CREDIT"
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {tx.direction ===
                "CREDIT"
                  ? "+"
                  : "-"}
                $
                {tx.amount.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {tx.direction}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}