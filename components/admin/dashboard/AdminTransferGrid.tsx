import type { DashboardStats } from "@/types/admin/dashboard.types";

import { AdminSectionCard } from "@/components/admin/cards/AdminSectionCard";

interface AdminTransferGridProps {
  data: DashboardStats;
}

export function AdminTransferGrid({
  data,
}: AdminTransferGridProps) {
  const totalPending =
    data.transfers.ach.pending +
    data.transfers.wire.pending +
    data.transfers.zelle.pending +
    data.transfers.internal.pending;

  const totalCompletedToday =
    data.transfers.ach.completedToday +
    data.transfers.wire.completedToday +
    data.transfers.zelle.completedToday +
    data.transfers.internal.completedToday;

  return (
    <>
      <AdminSectionCard
        title="Transfer Overview"
        description="All payment rails"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Pending
            </p>

            <p className="mt-1 text-3xl font-bold text-amber-600">
              {totalPending}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Completed Today
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {totalCompletedToday}
            </p>
          </div>
        </div>
      </AdminSectionCard>

      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        <AdminSectionCard
          title="ACH Transfers"
          description="Automated Clearing House"
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Pending</span>
              <span className="font-semibold text-amber-600">
                {data.transfers.ach.pending}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Processing</span>
              <span className="font-semibold text-blue-600">
                {data.transfers.ach.processing}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Completed Today</span>
              <span className="font-semibold text-green-600">
                {data.transfers.ach.completedToday}
              </span>
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Wire Transfers"
          description="Domestic & International"
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Pending</span>
              <span className="font-semibold text-amber-600">
                {data.transfers.wire.pending}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Approved</span>
              <span className="font-semibold text-purple-600">
                {data.transfers.wire.approved}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Processing</span>
              <span className="font-semibold text-blue-600">
                {data.transfers.wire.processing}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Completed Today</span>
              <span className="font-semibold text-green-600">
                {data.transfers.wire.completedToday}
              </span>
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Zelle"
          description="Instant Payments"
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Pending</span>
              <span className="font-semibold text-amber-600">
                {data.transfers.zelle.pending}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Completed Today</span>
              <span className="font-semibold text-green-600">
                {data.transfers.zelle.completedToday}
              </span>
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Internal Transfers"
          description="Between Apex Accounts"
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Pending</span>
              <span className="font-semibold text-amber-600">
                {data.transfers.internal.pending}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Completed Today</span>
              <span className="font-semibold text-green-600">
                {data.transfers.internal.completedToday}
              </span>
            </div>
          </div>
        </AdminSectionCard>
      </section>
    </>
  );
}