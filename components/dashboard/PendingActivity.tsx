"use client";

import Link from "next/link";
import {
  Clock3,
  Landmark,
  ArrowLeftRight,
} from "lucide-react";

interface PendingItem {
  id: string;
  recipientName: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface Props {
  wires: PendingItem[];
  achTransfers: PendingItem[];
}

export default function PendingActivity({
  wires,
  achTransfers,
}: Props) {
  const items = [
    ...wires.map((wire) => ({
      ...wire,
      type: "WIRE",
    })),

    ...achTransfers.map((ach) => ({
      ...ach,
      type: "ACH",
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b px-6 py-5">

        <h2 className="text-2xl font-bold text-slate-900">
          Pending Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Transfers awaiting completion
        </p>

      </div>

      {items.length === 0 ? (

        <div className="flex flex-col items-center justify-center px-6 py-12">

          <Clock3 className="h-12 w-12 text-emerald-600" />

          <h3 className="mt-4 text-lg font-semibold">
            Nothing Pending
          </h3>

          <p className="mt-2 text-center text-sm text-slate-500">
            All of your recent banking activities have been completed.
          </p>

        </div>

      ) : (

        <>
          {items.map((item) => (

            <div
              key={item.id}
              className="border-b px-6 py-5 last:border-0"
            >

              <div className="flex items-start gap-4">

                {/* Icon */}

                <div
                  className={`rounded-2xl p-3 ${
                    item.type === "WIRE"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.type === "WIRE" ? (
                    <Landmark className="h-5 w-5" />
                  ) : (
                    <ArrowLeftRight className="h-5 w-5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">

                  {/* Top Row */}

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <h3 className="font-semibold text-slate-900">
                        {item.type === "WIRE"
                          ? "Wire Transfer"
                          : "ACH Transfer"}
                      </h3>

                      <p className="truncate text-sm text-slate-500">
                        {item.recipientName}
                      </p>

                    </div>

                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : item.status ===
                            "PROCESSING"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                  {/* Bottom Row */}

                  <div className="mt-4 flex items-end justify-between">

                    <p className="text-3xl font-bold tracking-tight text-slate-900">

                      $
                      {item.amount.toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}

                    </p>

                    <span className="text-xs text-slate-400">

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}

                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))}

          <div className="border-t px-6 py-4">

            <Link
              href="/dashboard/transfers"
              className="font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              View All Transfers →
            </Link>

          </div>

        </>

      )}

    </div>
  );
}