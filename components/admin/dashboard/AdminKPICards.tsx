"use client";

import {
  AlertTriangle,
  DollarSign,
  Landmark,
  Users,
  Wallet,
  ShieldAlert,
  ArrowLeftRight,
  Clock,
} from "lucide-react";

import { AdminStatCard } from "@/components/admin/cards/AdminStatCard";

import type { DashboardStats } from "@/types/admin/dashboard.types";

interface AdminKPICardsProps {
  data: DashboardStats;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function AdminKPICards({
  data,
}: AdminKPICardsProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
      <AdminStatCard
        title="Customers"
        value={data.users.total}
        icon={Users}
        description={`${data.users.active} active`}
      />

      <AdminStatCard
        title="Accounts"
        value={data.accounts.total}
        icon={Landmark}
        description={`${data.accounts.active} active`}
      />

      <AdminStatCard
        title="Today's Volume"
        value={currency.format(data.volume.today)}
        icon={Wallet}
        description="Processed today"
      />

      <AdminStatCard
        title="Revenue"
        value={currency.format(data.revenue.month)}
        icon={DollarSign}
        description="Current month"
      />

      <AdminStatCard
        title="Pending Transfers"
        value={
          data.transfers.ach.pending +
          data.transfers.wire.pending +
          data.transfers.internal.pending +
          data.transfers.zelle.pending
        }
        icon={ArrowLeftRight}
        description="Awaiting processing"
      />

      <AdminStatCard
        title="AML Queue"
        value={data.risk.amlQueue}
        icon={ShieldAlert}
        description="Compliance review"
      />

      <AdminStatCard
        title="Flagged"
        value={data.risk.flagged}
        icon={AlertTriangle}
        description="Needs investigation"
      />

      <AdminStatCard
        title="Pending Review"
        value={data.risk.pendingReview}
        icon={Clock}
        description="Admin action required"
      />
    </section>
  );
}