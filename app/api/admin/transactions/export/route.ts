import { NextResponse } from "next/server";

import { exportTransactions } from "@/services/admin/transactions";

export async function GET() {
  const csv =
    await exportTransactions();

  return new NextResponse(csv, {
    headers: {
      "Content-Type":
        "text/csv",

      "Content-Disposition":
        'attachment; filename="transactions.csv"',
    },
  });
}