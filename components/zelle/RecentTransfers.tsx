"use client";

import Link from "next/link";

interface Transfer {
  id: string;
  recipientName?: string;
  recipientEmail: string;
  amount: number;
  memo: string;
  status: string;
  reference: string;
  createdAt: Date | string;
}

interface Props {
  transfers: Transfer[];
}

export default function RecentTransfers({
  transfers,
}: Props) {
  if (transfers.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8">
        <h2 className="mb-6 text-xl font-semibold">
          Recent Activity
        </h2>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 text-5xl">💸</div>

          <h3 className="text-lg font-semibold">
            No Zelle activity yet
          </h3>

          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Your recent Zelle payments will appear
            here after you send or receive money.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Activity
        </h2>

        <span className="text-sm text-muted-foreground">
          {transfers.length} Transfer
          {transfers.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-4">
        {transfers.map((transfer) => (
          <Link
            key={transfer.id}
            href={`/dashboard/zelle/transaction/${transfer.reference}`}
            className="block"
          >
            <div className="cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:border-black hover:bg-muted/40 hover:shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">
                    {transfer.recipientName ??
                      transfer.recipientEmail}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {transfer.recipientEmail}
                  </p>

                  {transfer.memo && (
                    <p className="mt-2 text-sm">
                      {transfer.memo}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>
                      Ref: {transfer.reference}
                    </span>

                    <span>
                      {new Date(
                        transfer.createdAt
                      ).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-red-600">
                    -$
                    {transfer.amount.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </p>

                  <StatusBadge
                    status={transfer.status}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized =
    status.toLowerCase();

  let classes =
    "inline-flex rounded-full px-3 py-1 text-xs font-medium";

  switch (normalized) {
    case "completed":
      classes +=
        " bg-green-100 text-green-700";
      break;

    case "pending":
      classes +=
        " bg-yellow-100 text-yellow-700";
      break;

    case "failed":
      classes +=
        " bg-red-100 text-red-700";
      break;

    case "cancelled":
      classes +=
        " bg-gray-200 text-gray-700";
      break;

    default:
      classes +=
        " bg-gray-100 text-gray-700";
  }

  return (
    <span className={classes}>
      {status}
    </span>
  );
}