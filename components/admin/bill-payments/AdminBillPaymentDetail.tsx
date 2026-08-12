"use client";

import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  User,
} from "lucide-react";

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
    phone: string;
  } | null;

  account: {
    _id: string;
    accountNumber: string;
    type: string;
    nickname: string;
    currency: string;
    currentBalance: number;
    availableBalance: number;
  } | null;
}

interface Props {
  payment: AdminBillPayment;
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
  if (!value) return "—";

  return new Date(
    value
  ).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminBillPaymentDetail({
  payment,
}: Props) {
  const customerName =
    payment.user
      ? `${payment.user.firstName} ${payment.user.lastName}`
      : "Unknown Customer";

  const currency =
    payment.account?.currency ||
    "USD";

  const accountLast4 =
    payment.account?.accountNumber
      ? payment.account.accountNumber.slice(
          -4
        )
      : "—";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/admin/bill-payments"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to bill payments
          </Link>

          <h1 className="text-2xl font-bold text-slate-900">
            Bill Payment
          </h1>

          <p className="mt-1 font-mono text-sm text-slate-500">
            {payment.reference}
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${statusStyles[payment.status]}`}
        >
          {payment.status}
        </span>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          icon={
            <DollarSign className="h-5 w-5" />
          }
          label="Payment Amount"
          value={formatMoney(
            payment.amount,
            currency
          )}
        />

        <SummaryCard
          icon={
            <FileText className="h-5 w-5" />
          }
          label="Biller"
          value={payment.biller}
        />

        <SummaryCard
          icon={
            <Clock3 className="h-5 w-5" />
          }
          label="Created"
          value={formatDate(
            payment.createdAt
          )}
        />
      </div>

      {/* Customer + Account */}
      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard title="Customer Information">
          <InfoRow
            label="Name"
            value={customerName}
          />

          <InfoRow
            label="Customer ID"
            value={
              payment.user
                ?.customerId || "—"
            }
          />

          <InfoRow
            label="Email"
            value={
              payment.user?.email || "—"
            }
          />

          <InfoRow
            label="Phone"
            value={
              payment.user?.phone || "—"
            }
          />
        </InfoCard>

        <InfoCard title="Payment Account">
          <InfoRow
            label="Account"
            value={
              payment.account
                ?.nickname ||
              payment.account?.type ||
              "—"
            }
          />

          <InfoRow
            label="Account Number"
            value={`••••${accountLast4}`}
          />

          <InfoRow
            label="Current Balance"
            value={formatMoney(
              payment.account
                ?.currentBalance || 0,
              currency
            )}
          />

          <InfoRow
            label="Available Balance"
            value={formatMoney(
              payment.account
                ?.availableBalance || 0,
              currency
            )}
          />
        </InfoCard>
      </div>

      {/* Payment information */}
      <InfoCard title="Payment Information">
        <InfoRow
          label="Biller"
          value={payment.biller}
        />

        <InfoRow
          label="Category"
          value={payment.category}
        />

        <InfoRow
          label="Biller Account"
          value={payment.accountNumber}
        />

        <InfoRow
          label="Amount"
          value={formatMoney(
            payment.amount,
            currency
          )}
        />

        <InfoRow
          label="Fee"
          value={formatMoney(
            payment.fee,
            currency
          )}
        />

        <InfoRow
          label="Total"
          value={formatMoney(
            payment.amount +
              payment.fee,
            currency
          )}
        />

        <InfoRow
          label="Memo"
          value={
            payment.memo || "—"
          }
        />
      </InfoCard>

      {/* Schedule */}
      <InfoCard title="Schedule & Recurrence">
        <InfoRow
          label="Payment Date"
          value={formatDate(
            payment.paymentDate
          )}
        />

        <InfoRow
          label="Scheduled Date"
          value={formatDate(
            payment.scheduledDate
          )}
        />

        <InfoRow
          label="Recurring"
          value={
            payment.isRecurring
              ? "Yes"
              : "No"
          }
        />

        <InfoRow
          label="Frequency"
          value={
            payment.recurringFrequency
          }
        />
      </InfoCard>

      {/* Confirmation */}
      <InfoCard title="Payment References">
        <InfoRow
          label="Reference"
          value={payment.reference}
        />

        <InfoRow
          label="Confirmation Number"
          value={
            payment.confirmationNumber ||
            "—"
          }
        />

        <InfoRow
          label="Created"
          value={formatDate(
            payment.createdAt
          )}
        />

        <InfoRow
          label="Last Updated"
          value={formatDate(
            payment.updatedAt
          )}
        />
      </InfoCard>

      {/* Status */}
      <div className="rounded-2xl border bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
            {payment.status ===
            "COMPLETED" ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <CalendarDays className="h-6 w-6" />
            )}
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Payment Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              This payment is currently{" "}
              <span className="font-semibold text-slate-700">
                {payment.status.toLowerCase()}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-center gap-3 text-slate-500">
        {icon}

        <span className="text-sm">
          {label}
        </span>
      </div>

      <p className="mt-3 break-all text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-white p-6">
      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        {title}
      </h2>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-medium text-slate-900 sm:text-right">
        {value}
      </span>
    </div>
  );
}