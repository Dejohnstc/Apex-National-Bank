"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileCheck2,
  XCircle,
} from "lucide-react";

import { reviewDepositAction } from "@/actions/mobile-check-deposit/reviewDepositAction";
import { makeFundsAvailableAction } from "@/actions/mobile-check-deposit/makeFundsAvailableAction";

interface DepositUser {
  _id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface DepositAccount {
  _id: string;
  accountNumber: string;
  type: string;
  nickname: string;
  currency: string;
  currentBalance: number;
  availableBalance: number;
}

interface StaffMember {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AdminDeposit {
  _id: string;

  amount: number;

  frontImage: string;
  backImage: string;

  reference: string;

  status:
    | "DRAFT"
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "FUNDS_AVAILABLE"
    | "REJECTED";

  reviewNotes: string;

  user: DepositUser | null;

  account: DepositAccount | null;

  reviewedBy: StaffMember | null;
  fundsReleasedBy: StaffMember | null;

  submittedAt: string | null;
  reviewedAt: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  availableAt: string | null;
  fundsReleasedAt: string | null;

  createdAt: string;
  updatedAt: string;
}

interface Props {
  deposit: AdminDeposit;
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

  return new Date(value).toLocaleString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

export default function AdminMobileCheckDepositDetail({
  deposit,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  function handleReview(
    decision:
      | "APPROVED"
      | "REJECTED"
  ) {
    const reviewNotes =
      window.prompt(
        decision === "REJECTED"
          ? "Enter the rejection reason:"
          : "Enter review notes (optional):"
      );

    if (
      decision === "REJECTED" &&
      !reviewNotes?.trim()
    ) {
      toast.error(
        "A rejection reason is required."
      );
      return;
    }

    startTransition(async () => {
      try {
        const result =
          await reviewDepositAction({
            depositId:
              deposit._id,
            decision,
            reviewNotes:
              reviewNotes ?? "",
          });

        if (!result.success) {
          toast.error(
            result.message
          );
          return;
        }

        toast.success(
          decision === "APPROVED"
            ? "Deposit approved."
            : "Deposit rejected."
        );

        window.location.reload();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to review deposit."
        );
      }
    });
  }

  function handleFundsAvailable() {
    const confirmed =
      window.confirm(
        "Make these funds available to the customer? This will credit the customer's account and create a transaction."
      );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      try {
        const result =
          await makeFundsAvailableAction({
            depositId:
              deposit._id,
          });

        if (!result.success) {
          toast.error(
            result.message
          );
          return;
        }

        toast.success(
          "Funds are now available."
        );

        window.location.reload();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to release funds."
        );
      }
    });
  }

  const customerName =
    deposit.user
      ? `${deposit.user.firstName} ${deposit.user.lastName}`
      : "Unknown Customer";

  const accountLast4 =
    deposit.account?.accountNumber
      ? deposit.account.accountNumber.slice(
          -4
        )
      : "—";

  const canReview =
    deposit.status === "SUBMITTED" ||
    deposit.status ===
      "UNDER_REVIEW";

  const canReleaseFunds =
    deposit.status === "APPROVED";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/admin/mobile-check-deposits"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to deposits
          </Link>

          <h1 className="text-2xl font-bold text-slate-900">
            Mobile Check Deposit
          </h1>

          <p className="mt-1 font-mono text-sm text-slate-500">
            {deposit.reference}
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${statusStyles[deposit.status]}`}
        >
          {deposit.status.replaceAll(
            "_",
            " "
          )}
        </span>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          icon={
            <DollarSign className="h-5 w-5" />
          }
          label="Deposit Amount"
          value={formatMoney(
            deposit.amount,
            deposit.account
              ?.currency || "USD"
          )}
        />

        <SummaryCard
          icon={
            <FileCheck2 className="h-5 w-5" />
          }
          label="Reference"
          value={deposit.reference}
        />

        <SummaryCard
          icon={
            <Clock3 className="h-5 w-5" />
          }
          label="Submitted"
          value={formatDate(
            deposit.submittedAt
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
              deposit.user
                ?.customerId || "—"
            }
          />

          <InfoRow
            label="Email"
            value={
              deposit.user?.email || "—"
            }
          />

          <InfoRow
            label="Phone"
            value={
              deposit.user?.phone || "—"
            }
          />
        </InfoCard>

        <InfoCard title="Deposit Account">
          <InfoRow
            label="Account"
            value={
              deposit.account
                ?.nickname ||
              deposit.account?.type ||
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
              deposit.account
                ?.currentBalance || 0,
              deposit.account
                ?.currency || "USD"
            )}
          />

          <InfoRow
            label="Available Balance"
            value={formatMoney(
              deposit.account
                ?.availableBalance || 0,
              deposit.account
                ?.currency || "USD"
            )}
          />
        </InfoCard>
      </div>

      {/* Check Images */}
      <InfoCard title="Check Images">
        <div className="grid gap-6 lg:grid-cols-2">
          <CheckImage
            title="Front of Check"
            src={deposit.frontImage}
          />

          <CheckImage
            title="Back of Check"
            src={deposit.backImage}
          />
        </div>
      </InfoCard>

      {/* Review information */}
      <InfoCard title="Review Information">
        <InfoRow
          label="Reviewed By"
          value={
            deposit.reviewedBy
              ? `${deposit.reviewedBy.firstName} ${deposit.reviewedBy.lastName}`
              : "Not reviewed"
          }
        />

        <InfoRow
          label="Reviewed At"
          value={formatDate(
            deposit.reviewedAt
          )}
        />

        <InfoRow
          label="Review Notes"
          value={
            deposit.reviewNotes ||
            "No review notes."
          }
        />

        <InfoRow
          label="Approved At"
          value={formatDate(
            deposit.approvedAt
          )}
        />

        <InfoRow
          label="Rejected At"
          value={formatDate(
            deposit.rejectedAt
          )}
        />
      </InfoCard>

      {/* Funds information */}
      <InfoCard title="Funds Availability">
        <InfoRow
          label="Released By"
          value={
            deposit.fundsReleasedBy
              ? `${deposit.fundsReleasedBy.firstName} ${deposit.fundsReleasedBy.lastName}`
              : "Not released"
          }
        />

        <InfoRow
          label="Released At"
          value={formatDate(
            deposit.fundsReleasedAt
          )}
        />

        <InfoRow
          label="Available At"
          value={formatDate(
            deposit.availableAt
          )}
        />
      </InfoCard>

      {/* Actions */}
      {(canReview ||
        canReleaseFunds) && (
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Deposit Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review the check before changing
            its status or releasing funds.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {canReview && (
              <>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    handleReview(
                      "APPROVED"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve Deposit
                </button>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    handleReview(
                      "REJECTED"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <XCircle className="h-4 w-4" />
                  Reject Deposit
                </button>
              </>
            )}

            {canReleaseFunds && (
              <button
                type="button"
                disabled={isPending}
                onClick={
                  handleFundsAvailable
                }
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <DollarSign className="h-4 w-4" />
                Make Funds Available
              </button>
            )}
          </div>
        </div>
      )}
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

function CheckImage({
  title,
  src,
}: {
  title: string;
  src: string;
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-slate-700">
        {title}
      </h3>

      <div className="relative min-h-[280px] overflow-hidden rounded-xl border bg-slate-50">
        <Image
          src={src}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}