import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";
import { getRecentActivity } from "./getRecentActivity";
import type {
  DashboardResponse,
  DashboardStats,
} from "@/types/admin/dashboard.types";
import { getSystemHealth } from "./getSystemHealth";
import { getUserStats } from "./getUserStats";
import { getAccountStats } from "./getAccountStats";
import { getTransactionStats } from "./getTransactionStats";
import { getTransferStats } from "./getTransferStats";
import { getRiskStats } from "./getRiskStats";
import { getDashboardAlerts } from "./getDashboardAlerts";
export async function getDashboardStats(): Promise<DashboardResponse> {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  // TODO: Verify admin role

  const [
  users,
  accounts,
  transactions,
  transfers,
  risk,
  health,
  recentActivity,
  alerts,
] = await Promise.all([
  getUserStats(),
  getAccountStats(),
  getTransactionStats(),
  getTransferStats(),
  getRiskStats(),
  getSystemHealth(),
  getRecentActivity(),
  getDashboardAlerts(),
]);

 const data: DashboardStats = {
  users,
  accounts,
  transfers,

  volume: transactions.volume,

  revenue: transactions.revenue,

  risk,

  health,

 recentActivity,

  alerts,
};

  return {
    success: true,
    data,
  };
}