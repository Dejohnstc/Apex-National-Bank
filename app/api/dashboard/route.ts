import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getDashboard } from "@/services/dashboard/gettDashboard";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const dashboard = await getDashboard({
    userId: session.user.id,
  });

  return NextResponse.json(dashboard);
}