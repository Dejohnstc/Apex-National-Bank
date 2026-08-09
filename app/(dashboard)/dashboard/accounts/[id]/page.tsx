import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { getAccount } from "@/services/account/getAccount";

import { AccountHeader } from "@/components/accounts/AccountHeader";
import { BalanceSummary } from "@/components/accounts/BalanceSummary";
import { AccountInformation } from "@/components/accounts/AccountInformation";

interface AccountPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AccountPage({
  params,
}: AccountPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const account = await getAccount(
    id,
    session.user.id
  );

  if (!account) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AccountHeader account={account} />

      <BalanceSummary account={account} />

      <AccountInformation
        account={account}
      />
    </div>
  );
}