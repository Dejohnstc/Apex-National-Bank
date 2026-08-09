import {
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

import { AdminSectionCard } from "@/components/admin/cards/AdminSectionCard";

import type {
  DashboardStats,
} from "@/types/admin/dashboard.types";

interface AdminRiskPanelProps {
  data: DashboardStats;
}

export function AdminRiskPanel({
  data,
}: AdminRiskPanelProps) {
  return (
    <AdminSectionCard
      title="Risk & Compliance"
      description="Operational monitoring"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span>Flagged Transactions</span>
          </div>

          <span className="font-semibold">
            {data.risk.flagged}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-500" />
            <span>Failed Transactions</span>
          </div>

          <span className="font-semibold">
            {data.risk.failed}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Pending Review</span>

          <span className="font-semibold">
            {data.risk.pendingReview}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>AML Queue</span>

          <span className="font-semibold">
            {data.risk.amlQueue}
          </span>
        </div>
      </div>
    </AdminSectionCard>
  );
}