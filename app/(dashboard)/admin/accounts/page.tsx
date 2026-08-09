import { getAccounts } from "@/services/admin/accounts";

import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";

import { AccountToolbar } from "@/components/admin/accounts/AccountToolbar";
import { AccountSummaryCards } from "@/components/admin/accounts/AccountSummaryCards";
import { AccountTable } from "@/components/admin/accounts/AccountTable";
import { AccountPagination } from "@/components/admin/accounts/AccountPagination";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    type?: string;
    sort?: string;
  }>;
}

export default async function AccountsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const result = await getAccounts({
    page: Number(params.page ?? 1),

    search: params.search,

    status: params.status as
      | "ACTIVE"
      | "FROZEN"
      | "CLOSED"
      | undefined,

    type: params.type as
      | "CHECKING"
      | "SAVINGS"
      | "BUSINESS"
      | undefined,

    sort: params.sort as
      | "newest"
      | "oldest"
      | "balance"
      | undefined,
  });

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        title="Accounts"
        description="Manage all customer accounts."
      />

      <AccountSummaryCards
        accounts={result.data}
      />

      <AccountToolbar />

      <AccountTable
        accounts={result.data}
      />

      <AccountPagination
        pagination={result.pagination}
      />
    </div>
  );
}