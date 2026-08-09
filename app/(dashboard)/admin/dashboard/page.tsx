import { getDashboardStats } from "@/services/admin/dashboard";

import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";
import { AdminKPICards } from "@/components/admin/dashboard/AdminKPICards";
import { AdminTransferGrid } from "@/components/admin/dashboard/AdminTransferGrid";
import { AdminRiskPanel } from "@/components/admin/dashboard/AdminRiskPanel";
import { AdminSystemHealth } from "@/components/admin/dashboard/AdminSystemHealth";
import { AdminCharts } from "@/components/admin/dashboard/AdminCharts";
import { AdminRecentActivity } from "@/components/admin/dashboard/AdminRecentActivity";
import { AdminQuickActions } from "@/components/admin/dashboard/AdminQuickActions";

export default async function AdminDashboardPage() {
  const { data } = await getDashboardStats();

  return (
    <main className="space-y-6 p-6">
      <AdminDashboardHeader />

      <AdminKPICards data={data} />

      <AdminTransferGrid data={data} />

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminRiskPanel data={data} />

        <AdminSystemHealth data={data} />
      </div>

      <AdminCharts data={data} />

      <AdminRecentActivity data={data} />

      <AdminQuickActions />
    </main>
  );
}