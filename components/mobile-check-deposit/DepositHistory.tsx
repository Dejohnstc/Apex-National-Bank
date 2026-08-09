"use client";

import type { CheckDeposit } from "@/types/check-deposit";

import DepositStatusBadge from "./DepositStatusBadge";

interface Props {
  deposits: CheckDeposit[];
}

export default function DepositHistory({
  deposits,
}: Props) {
  if (deposits.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center">
        <h3 className="text-lg font-semibold">
          No Deposits
        </h3>

        <p className="mt-2 text-muted-foreground">
          You haven&apos;t submitted any mobile
          check deposits yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="p-4 text-left">
              Reference
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Submitted
            </th>

            <th className="p-4 text-left">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {deposits.map((deposit) => (
            <tr
              key={deposit._id}
              className="border-t"
            >
              <td className="p-4 font-medium">
                {deposit.reference}
              </td>

              <td className="p-4">
                {new Intl.NumberFormat(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                ).format(deposit.amount)}
              </td>

              <td className="p-4">
                {new Date(
                  deposit.submittedAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                <DepositStatusBadge
                  status={deposit.status}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}