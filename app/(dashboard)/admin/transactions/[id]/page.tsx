import { notFound } from "next/navigation";

import { getTransaction } from "@/services/admin/transactions";

import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";

import { TransactionDetailCard } from "@/components/admin/transactions/TransactionDetailCard";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function TransactionPage({
  params,
}: Props) {
  const { id } = await params;

  const result = await getTransaction(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const transaction = result.data;

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        title={transaction.reference}
        description={transaction.customerName}
      />

      <TransactionDetailCard
        transaction={transaction}
      />
    </div>
  );
}