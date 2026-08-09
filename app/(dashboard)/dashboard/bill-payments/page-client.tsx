"use client";

import { useState } from "react";

import PaymentForm from "@/components/bill-payments/PaymentForm";
import PaymentHistory from "@/components/bill-payments/PaymentHistory";

import type { Account } from "@/types/account";
import type { BillPayment } from "@/types/bill-payment";

interface Props {
  initialPayments: BillPayment[];
  accounts: Account[];
}

export default function BillPaymentsPageClient({
  initialPayments,
  accounts,
}: Props) {
  const [payments] =
    useState<BillPayment[]>(initialPayments);

  return (
    <div className="space-y-6">
      <PaymentForm
        accounts={accounts}
      />

      <PaymentHistory
        payments={payments}
      />
    </div>
  );
}