"use client";

import { useState } from "react";

import type { Account } from "@/types/account";
import type { CheckDeposit } from "@/types/check-deposit";

import DepositForm from "@/components/mobile-check-deposit/Deposit";
import DepositHistory from "@/components/mobile-check-deposit/DepositHistory";

interface Props {
  accounts: Account[];
  initialDeposits: CheckDeposit[];
}

export default function MobileCheckDepositPageClient({
  accounts,
  initialDeposits,
}: Props) {
  const [deposits] =
    useState(initialDeposits);

  return (
    <div className="space-y-6">
      <DepositForm
        accounts={accounts}
      />

      <DepositHistory
        deposits={deposits}
      />
    </div>
  );
}