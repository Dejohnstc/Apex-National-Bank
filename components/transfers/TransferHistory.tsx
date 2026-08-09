import Link from "next/link";

import type { Transaction } from "@/types";

interface TransferHistoryProps {
  transfers: Transaction[];
}

export function TransferHistory({
  transfers,
}: TransferHistoryProps) {
  if (transfers.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <h3 className="text-lg font-semibold">
          No transfers yet
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Your completed transfers will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-6 py-4 text-left">
              Date
            </th>

            <th className="px-6 py-4 text-left">
              Description
            </th>

            <th className="px-6 py-4 text-left">
              Type
            </th>

            <th className="px-6 py-4 text-right">
              Amount
            </th>

            <th className="px-6 py-4 text-center">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Receipt
            </th>
          </tr>
        </thead>

        <tbody>
          {transfers.map((transfer) => (
            <tr
              key={transfer._id}
              className="border-b last:border-b-0"
            >
              <td className="px-6 py-4">
                {new Date(
                  transfer.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                {transfer.description}
              </td>

              <td className="px-6 py-4">
                {transfer.direction}
              </td>

              <td className="px-6 py-4 text-right font-semibold">
                $
                {transfer.amount.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </td>

              <td className="px-6 py-4 text-center">
                {transfer.status}
              </td>

              <td className="px-6 py-4 text-center">
                <Link
                  href={`/dashboard/transactions/${transfer._id}`}
                  className="text-primary hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}