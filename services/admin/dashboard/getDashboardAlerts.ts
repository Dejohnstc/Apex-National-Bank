import type { DashboardAlert } from "@/types/admin/dashboard.types";

import { getRiskStats } from "./getRiskStats";

export async function getDashboardAlerts(): Promise<DashboardAlert[]> {
  const risk = await getRiskStats();

  const alerts: DashboardAlert[] = [];

  if (risk.flagged > 0) {
    alerts.push({
      id: "flagged-transactions",
      severity: "high",
      title: "Flagged Transactions",
      description: `${risk.flagged} transaction(s) require review.`,
    });
  }

  if (risk.pendingReview > 0) {
    alerts.push({
      id: "pending-review",
      severity: "medium",
      title: "Pending Reviews",
      description: `${risk.pendingReview} item(s) are awaiting review.`,
    });
  }

  if (risk.failed > 0) {
    alerts.push({
      id: "failed-transfers",
      severity: "medium",
      title: "Failed Transfers",
      description: `${risk.failed} transfer(s) have failed.`,
    });
  }

  if (risk.amlQueue > 0) {
    alerts.push({
      id: "aml-queue",
      severity: "critical",
      title: "AML Queue",
      description: `${risk.amlQueue} AML case(s) require attention.`,
    });
  }

  return alerts;
}