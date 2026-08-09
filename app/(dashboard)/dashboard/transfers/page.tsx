import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

import { getAccounts } from "@/services/account/getAccounts";

import { getTransfers } from "@/services/transfer/getTransfers";

import { TransferForm } from "@/components/transfers/TransferForm";
import { TransferHistory } from "@/components/transfers/TransferHistory";

export default async function TransfersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [accounts, transfers] =
    await Promise.all([
      getAccounts(session.user.id),
      getTransfers(session.user.id),
    ]);

  return (
    <div className="space-y-8">
      <TransferForm
        accounts={accounts}
        userId={session.user.id}
      />

      <TransferHistory
        transfers={transfers}
      />
    </div>
  );
}