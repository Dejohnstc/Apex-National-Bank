import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";

import { TransferSummaryCards } from "@/components/admin/transfers/TransferSummaryCards";
import { TransferToolbar } from "@/components/admin/transfers/TransferToolbar";
import { TransferTable } from "@/components/admin/transfers/TransferTable";
import { TransferPagination } from "@/components/admin/transfers/TransferPagination";

import { getTransfers } from "@/services/admin/transfers/getTransfers";

import type {
  TransferStatus,
  TransferType,
} from "@/services/admin/transfers/types";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    type?: string;
  }>;
}

export default async function TransfersPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const result = await getTransfers({
    page: Number(params.page ?? 1),

   type:
  (params.type as TransferType) ??
  "ALL",

    status:
      params.status as
        | TransferStatus
        | undefined,

    search: params.search,
  });

  if (!result.success) {
    return (
      <div className="p-6">
        Failed to load transfers.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        title="Transfers"
        description="Manage ACH, Wire, Zelle and Internal transfers."
      />

      <TransferSummaryCards
        summary={
          result.summary ?? {
            totalTransfers: 0,
            totalVolume: 0,
            pendingTransfers: 0,
            completedTransfers: 0,
          }
        }
      />

      <TransferToolbar />

      <TransferTable
        transfers={result.data ?? []}
      />

      {result.pagination && (
        <TransferPagination
          pagination={result.pagination}
        />
      )}
    </div>
  );
}