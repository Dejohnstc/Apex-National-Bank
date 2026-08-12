import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getDeposit } from "@/services/mobile-check-deposit/getDeposit";

import DepositStatusBadge from "@/components/mobile-check-deposit/DepositStatusBadge";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(
  value: Date | string | null | undefined
) {
  if (!value) return "—";

  return new Date(value).toLocaleString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

export default async function MobileCheckDepositDetailsPage({
  params,
}: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  let deposit;

  try {
    deposit = await getDeposit({
      userId: session.user.id,
      depositId: id,
    });
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/mobile-check-deposit"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Mobile Check Deposit
        </Link>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Check Deposit Details
            </h1>

            <p className="text-sm text-muted-foreground">
              Reference: {deposit.reference}
            </p>
          </div>

          <DepositStatusBadge
            status={deposit.status}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Amount
            </p>

            <p className="mt-1 text-2xl font-semibold">
              {formatMoney(deposit.amount)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Reference
            </p>

            <p className="mt-1 font-mono text-sm">
              {deposit.reference}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Submitted
            </p>

            <p className="mt-1 font-medium">
              {formatDate(
                deposit.submittedAt
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Approved
            </p>

            <p className="mt-1 font-medium">
              {formatDate(
                deposit.approvedAt
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Funds Available
            </p>

            <p className="mt-1 font-medium">
              {formatDate(
                deposit.availableAt
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Rejected
            </p>

            <p className="mt-1 font-medium">
              {formatDate(
                deposit.rejectedAt
              )}
            </p>
          </div>
        </div>
      </div>

      {deposit.reviewNotes && (
        <div className="rounded-xl border p-6">
          <h2 className="font-semibold">
            Review Notes
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {deposit.reviewNotes}
          </p>
        </div>
      )}

      <div className="rounded-xl border p-6">
        <h2 className="font-semibold">
          Deposit Status
        </h2>

        <div className="mt-4">
          <DepositStatusBadge
            status={deposit.status}
          />
        </div>

        {deposit.status ===
          "SUBMITTED" && (
          <p className="mt-3 text-sm text-muted-foreground">
            Your check has been submitted
            successfully and is awaiting review.
          </p>
        )}

        {deposit.status ===
          "UNDER_REVIEW" && (
          <p className="mt-3 text-sm text-muted-foreground">
            Your check is currently being
            reviewed.
          </p>
        )}

        {deposit.status ===
          "APPROVED" && (
          <p className="mt-3 text-sm text-muted-foreground">
            Your check has been approved and is
            being prepared for funds availability.
          </p>
        )}

        {deposit.status ===
          "FUNDS_AVAILABLE" && (
          <p className="mt-3 text-sm text-muted-foreground">
            The deposited funds are now available
            in your account.
          </p>
        )}

        {deposit.status ===
          "REJECTED" && (
          <p className="mt-3 text-sm text-destructive">
            This check deposit was rejected.
            Please review the notes above.
          </p>
        )}
      </div>
    </div>
  );
}