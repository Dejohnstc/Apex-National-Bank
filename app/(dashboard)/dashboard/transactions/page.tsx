import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { TransactionsView } from "@/components/dashboard/transactions/TransactionsView";
import { getAccounts } from "@/services/account/getAccounts";
import { getTransactions } from "@/services/transaction/getTransactions";


interface TransactionsPageProps {
  searchParams?: Promise<{
    account?: string;
  }>;
}

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const accounts = await getAccounts(session.user.id);

  if (accounts.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center">
        <h2 className="text-xl font-semibold">
          No accounts found
        </h2>

        <p className="mt-2 text-muted-foreground">
          You don&apos;t have any bank accounts yet.
        </p>
      </div>
    );
  }

  const params = await searchParams;

  const selectedAccount =
    accounts.find(
      (account) =>
        account._id === params?.account
    ) ?? accounts[0];

  const transactions =
    await getTransactions({
      accountId: selectedAccount._id,
    });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Transactions
        </h1>

        <p className="text-muted-foreground">
          {selectedAccount.nickname ||
            selectedAccount.type}
        </p>
      </div>

    <TransactionsView
  accounts={accounts}
  account={selectedAccount}
  transactions={transactions}
/>
    </div>
  );
}