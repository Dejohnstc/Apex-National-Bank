"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  Eye,
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";

type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | "SCHEDULED";

interface AdminBillPayment {
  _id: string;

  biller: string;
  category: string;
  accountNumber: string;

  amount: number;
  fee: number;

  memo: string;

  status: PaymentStatus;

  paymentDate: string | null;
  scheduledDate: string | null;

  reference: string;
  confirmationNumber: string;

  isRecurring: boolean;

  recurringFrequency:
    | "NONE"
    | "WEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "YEARLY";

  createdAt: string;
  updatedAt: string;

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
  payments: AdminBillPayment[];
}

const statusStyles: Record<
  PaymentStatus,
  string
> = {
  PENDING:
    "bg-yellow-100 text-yellow-700",

  PROCESSING:
    "bg-blue-100 text-blue-700",

  COMPLETED:
    "bg-emerald-100 text-emerald-700",

  FAILED:
    "bg-red-100 text-red-700",

  CANCELLED:
    "bg-slate-100 text-slate-700",

  SCHEDULED:
    "bg-purple-100 text-purple-700",
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
  if (!value) {
    return "—";
  }

  return new Date(
    value
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminBillPayments({
  payments,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<
      "ALL" | PaymentStatus
    >("ALL");

  const filteredPayments =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return payments.filter(
        (payment) => {
          if (
            status !== "ALL" &&
            payment.status !== status
          ) {
            return false;
          }

          if (!query) {
            return true;
          }

          const customer =
            payment.user
              ? `${payment.user.firstName} ${payment.user.lastName}`
              : "";

          const email =
            payment.user?.email ?? "";

          const customerId =
            payment.user?.customerId ?? "";

          return (
            payment.reference
              .toLowerCase()
              .includes(query) ||
            payment.biller
              .toLowerCase()
              .includes(query) ||
            payment.category
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
      payments,
      search,
      status,
    ]);

  const counts = useMemo(
    () => ({
      total: payments.length,

      pending: payments.filter(
        (payment) =>
          payment.status === "PENDING"
      ).length,

      processing: payments.filter(
        (payment) =>
          payment.status === "PROCESSING"
      ).length,

      scheduled: payments.filter(
        (payment) =>
          payment.status === "SCHEDULED"
      ).length,

      completed: payments.filter(
        (payment) =>
          payment.status === "COMPLETED"
      ).length,

      failed: payments.filter(
        (payment) =>
          payment.status === "FAILED"
      ).length,
    }),
    [payments]
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
          label="Pending"
          value={counts.pending}
        />

        <SummaryCard
          label="Processing"
          value={counts.processing}
        />

        <SummaryCard
          label="Scheduled"
          value={counts.scheduled}
        />

        <SummaryCard
          label="Completed"
          value={counts.completed}
        />

        <SummaryCard
          label="Failed"
          value={counts.failed}
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
            placeholder="Search customer, biller, category, or reference..."
            className="pl-9"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as
                | "ALL"
                | PaymentStatus
            )
          }
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="ALL">
            All Statuses
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="PROCESSING">
            Processing
          </option>

          <option value="SCHEDULED">
            Scheduled
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="FAILED">
            Failed
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border bg-white">
        {filteredPayments.length ===
        0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No bill payments found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search
              or status filter.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50">
              <tr className="border-b">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Biller
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reference
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
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
              {filteredPayments.map(
                (payment) => {
                  const customer =
                    payment.user
                      ? `${payment.user.firstName} ${payment.user.lastName}`
                      : "Unknown Customer";

                  const currency =
                    payment.account
                      ?.currency ||
                    "USD";

                  const date =
                    payment.status ===
                    "SCHEDULED"
                      ? payment.scheduledDate
                      : payment.paymentDate;

                  return (
                    <tr
                      key={payment._id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-900">
                          {customer}
                        </div>

                        <div className="text-xs text-slate-500">
                          {payment.user
                            ?.customerId ||
                            payment.user
                              ?.email ||
                            "—"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-900">
                          {payment.biller}
                        </div>

                        <div className="text-xs text-slate-500">
                          {payment.accountNumber}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {payment.category}
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900">
                          {formatMoney(
                            payment.amount,
                            currency
                          )}
                        </div>

                        {payment.fee >
                          0 && (
                          <div className="text-xs text-slate-500">
                            Fee:{" "}
                            {formatMoney(
                              payment.fee,
                              currency
                            )}
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-4 font-mono text-xs text-slate-600">
                        {payment.reference}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatDate(
                          date
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[payment.status]}`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/bill-payments/${payment._id}`}
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