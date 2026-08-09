import { NextResponse } from "next/server";

import { getDashboardStats } from "@/services/admin/dashboard";

export async function GET() {
  try {
    const result = await getDashboardStats();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Dashboard Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard.",
      },
      {
        status: 500,
      }
    );
  }
}