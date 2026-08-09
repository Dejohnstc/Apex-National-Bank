import { notFound } from "next/navigation";

import { getAccount } from "@/services/admin/accounts";

import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";

import { AccountBalanceCard } from "@/components/admin/accounts/AccountBalanceCard";

import { AccountInfoCard } from "@/components/admin/accounts/AccountInfoCard";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AccountPage({
  params,
}: Props) {
  const { id } = await params;

  const result = await getAccount(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const account = result.data;

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        title={account.nickname}
        description={account.accountNumber}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AccountBalanceCard
          account={account}
        />

        <AccountInfoCard account={account} />
      </div>
    </div>
  );
}