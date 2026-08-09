import { auth } from "@/lib/auth";

import { getAccounts } from "@/services/account/getAccounts";
import { getDeposits } from "@/services/mobile-check-deposit/getDeposits";

import MobileCheckDepositPageClient from "./page-client";

export default async function MobileCheckDepositPage() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const [accounts, deposits] =
    await Promise.all([
      getAccounts(session.user.id),
      getDeposits({
        userId: session.user.id,
      }),
    ]);

  const serializedDeposits =
    deposits.map((deposit) => ({
      ...deposit,
      _id: deposit._id.toString(),
      user: deposit.user.toString(),
      account: deposit.account.toString(),
      submittedAt:
        deposit.submittedAt.toISOString(),
      approvedAt:
        deposit.approvedAt?.toISOString() ??
        null,
      rejectedAt:
        deposit.rejectedAt?.toISOString() ??
        null,
      availableAt:
        deposit.availableAt?.toISOString() ??
        null,
      createdAt:
        deposit.createdAt.toISOString(),
      updatedAt:
        deposit.updatedAt.toISOString(),
    }));

  return (
    <MobileCheckDepositPageClient
      accounts={accounts}
      initialDeposits={
        serializedDeposits
      }
    />
  );
}