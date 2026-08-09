import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";

import {
  LoanPagination,
  LoanSummaryCards,
  LoanTable,
  LoanToolbar,
} from "@/components/admin/loans";

import { getLoans } from "@/services/admin/loans";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    type?: string;
    sort?: string;
  }>;
}

export default async function LoansPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const result = await getLoans({
    page: Number(params.page ?? 1),

    search: params.search,

    status: params.status as
      | "PENDING"
      | "ACTIVE"
      | "PAID"
      | "DEFAULTED"
      | "REJECTED"
      | undefined,

    type: params.type as
      | "PERSONAL"
      | "AUTO"
      | "MORTGAGE"
      | "BUSINESS"
      | undefined,

    sort: params.sort,
  });

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        title="Loans"
        description="Manage customer loans."
      />

      <LoanSummaryCards
        summary={result.summary}
      />

      <LoanToolbar />

      <LoanTable
        loans={result.data}
      />

      <LoanPagination
        pagination={result.pagination}
      />
    </div>
  );
}