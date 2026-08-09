import { getTransactions } from "@/services/admin/transactions";

import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";

import { TransactionSummaryCards } from "@/components/admin/transactions/TransactionSummaryCards";

import { TransactionToolbar } from "@/components/admin/transactions/TransactionToolbar";

import { TransactionTable } from "@/components/admin/transactions/TransactionTable";

import { TransactionPagination } from "@/components/admin/transactions/TransactionPagination";

import type {
  TransactionDirection,
  TransactionStatus,
  TransactionType,
} from "@/types/admin/transaction.types";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    type?: string;
    direction?: string;
    sort?: string;
  }>;
}

export default async function TransactionsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const result = await getTransactions({
    page: Number(params.page ?? 1),

    search: params.search,

    status: params.status as
      | TransactionStatus
      | undefined,

    type: params.type as
      | TransactionType
      | undefined,

    direction: params.direction as
      | TransactionDirection
      | undefined,

    sort: params.sort as
      | "newest"
      | "oldest"
      | "highest"
      | "lowest"
      | undefined,
  });

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        title="Transactions"
        description="Manage every transaction in the banking platform."
      />

      <TransactionSummaryCards
        summary={result.summary}
      />

      <TransactionToolbar />

      <TransactionTable
        transactions={result.data}
      />

      <TransactionPagination
        pagination={result.pagination}
      />
    </div>
  );
}