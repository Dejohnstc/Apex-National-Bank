"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  Eye,
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";

interface AdminDeposit {
  _id: string;

  amount: number;

  reference: string;

  status:
    | "DRAFT"
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "FUNDS_AVAILABLE"
    | "REJECTED";

  submittedAt: string | null;

  user: {
    _id: string;
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;

  account: {
    _id: string;
    accountNumber: string;
    type: string;
    nickname: string;
    currency: string;
  } | null;
}

interface Props {
  deposits: AdminDeposit[];
}

const statusStyles: Record<
  AdminDeposit["status"],
  string
> = {
  DRAFT:
    "bg-gray-100 text-gray-700",

  SUBMITTED:
    "bg-blue-100 text-blue-700",

  UNDER_REVIEW:
    "bg-yellow-100 text-yellow-700",

  APPROVED:
    "bg-green-100 text-green-700",

  FUNDS_AVAILABLE:
    "bg-emerald-100 text-emerald-700",

  REJECTED:
    "bg-red-100 text-red-700",
};

function formatMoney(
  amount: number,
  currency = "USD"
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency,
    }
  ).format(amount);
}

function formatDate(
  value: string | null
) {
  if (!value) return "—";

  return new Date(
    value
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminMobileCheckDeposits({
  deposits,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<
      "ALL" | AdminDeposit["status"]
    >("ALL");

  const filteredDeposits =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return deposits.filter(
        (deposit) => {
          const matchesStatus =
            status === "ALL" ||
            deposit.status === status;

          if (!matchesStatus) {
            return false;
          }

          if (!query) {
            return true;
          }

          const customer =
            deposit.user
              ? `${deposit.user.firstName} ${deposit.user.lastName}`
              : "";

          const email =
            deposit.user?.email ?? "";

          const customerId =
            deposit.user?.customerId ?? "";

          return (
            deposit.reference
              .toLowerCase()
              .includes(query) ||
            customer
              .toLowerCase()
              .includes(query) ||
            email
              .toLowerCase()
              .includes(query) ||
            customerId
              .toLowerCase()
              .includes(query)
          );
        }
      );
    }, [
      deposits,
      search,
      status,
    ]);

  const counts = useMemo(
    () => ({
      total: deposits.length,

      submitted: deposits.filter(
        (d) =>
          d.status === "SUBMITTED"
      ).length,

      underReview: deposits.filter(
        (d) =>
          d.status === "UNDER_REVIEW"
      ).length,

      approved: deposits.filter(
        (d) =>
          d.status === "APPROVED"
      ).length,

      available: deposits.filter(
        (d) =>
          d.status ===
          "FUNDS_AVAILABLE"
      ).length,

      rejected: deposits.filter(
        (d) =>
          d.status === "REJECTED"
      ).length,
    }),
    [deposits]
  );

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <SummaryCard
          label="Total"
          value={counts.total}
        />

        <SummaryCard
          label="Submitted"
          value={counts.submitted}
        />

        <SummaryCard
          label="Under Review"
          value={counts.underReview}
        />

        <SummaryCard
          label="Approved"
          value={counts.approved}
        />

        <SummaryCard
          label="Funds Available"
          value={counts.available}
        />

        <SummaryCard
          label="Rejected"
          value={counts.rejected}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border bg-white p-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search customer, email, ID, or reference..."
            className="pl-9"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as
                | "ALL"
                | AdminDeposit["status"]
            )
          }
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="ALL">
            All Statuses
          </option>

          <option value="SUBMITTED">
            Submitted
          </option>

          <option value="UNDER_REVIEW">
            Under Review
          </option>

          <option value="APPROVED">
            Approved
          </option>

          <option value="FUNDS_AVAILABLE">
            Funds Available
          </option>

          <option value="REJECTED">
            Rejected
          </option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border bg-white">
        {filteredDeposits.length ===
        0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No deposits found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search
              or status filter.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr className="border-b">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Account
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reference
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Submitted
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredDeposits.map(
                (deposit) => {
                  const customer =
                    deposit.user
                      ? `${deposit.user.firstName} ${deposit.user.lastName}`
                      : "Unknown Customer";

                  const accountNumber =
                    deposit.account
                      ?.accountNumber;

                  return (
                    <tr
                      key={deposit._id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-900">
                          {customer}
                        </div>

                        <div className="text-xs text-slate-500">
                          {deposit.user
                            ?.customerId ||
                            deposit.user
                              ?.email ||
                            "—"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-900">
                          {deposit.account
                            ?.nickname ||
                            deposit.account
                              ?.type ||
                            "Account"}
                        </div>

                        <div className="text-xs text-slate-500">
                          ••••
                          {accountNumber?.slice(
                            -4
                          ) || "—"}
                        </div>
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {formatMoney(
                          deposit.amount,
                          deposit.account
                            ?.currency ||
                            "USD"
                        )}
                      </td>

                      <td className="px-5 py-4 font-mono text-xs text-slate-600">
                        {deposit.reference}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatDate(
                          deposit.submittedAt
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[deposit.status]}`}
                        >
                          {deposit.status.replaceAll(
                            "_",
                            " "
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/mobile-check-deposits/${deposit._id}`}
                          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}