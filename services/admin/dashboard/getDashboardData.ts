import type { DashboardResponse } from "@/types/admin/dashboard.types";

export async function getDashboardData(): Promise<DashboardResponse> {
  const response = await fetch("/api/admin/dashboard", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load dashboard.");
  }

  return response.json();
}