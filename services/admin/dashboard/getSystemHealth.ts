import mongoose from "mongoose";

import type { SystemStatus } from "@/types/admin/dashboard.types";

export interface SystemHealth {
  database: SystemStatus;
  api: SystemStatus;
  email: SystemStatus;
  payments: SystemStatus;
}

export async function getSystemHealth(): Promise<SystemHealth> {
  const database: SystemStatus =
    mongoose.connection.readyState === 1
      ? "healthy"
      : "down";

  const api: SystemStatus = "healthy";

  const email: SystemStatus = process.env.RESEND_API_KEY
    ? "healthy"
    : "warning";

  const payments: SystemStatus =
    process.env.FLUTTERWAVE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY
      ? "healthy"
      : "warning";

  return {
    database,
    api,
    email,
    payments,
  };
}