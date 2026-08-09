"use client";

import type { BillPayment } from "@/types/bill-payment";

interface Props {
  payments: BillPayment[];
}

export default function PaymentHistory({
  payments,
}: Props) {
  if (payments.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <h3 className="text-lg font-semibold">
          No Bill Payments
        </h3>

        <p className="mt-2 text-muted-foreground">
          You haven&apos;t made any bill payments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="p-4 text-left">
              Biller
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment._id}
              className="border-t"
            >
              <td className="p-4">
                {payment.biller}
              </td>

              <td className="p-4">
                {new Intl.NumberFormat(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                ).format(payment.amount)}
              </td>

              <td className="p-4">
                {payment.status}
              </td>

              <td className="p-4">
                {payment.paymentDate
                  ? new Date(
                      payment.paymentDate
                    ).toLocaleDateString()
                  : "Scheduled"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}