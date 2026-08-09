import { Transaction } from "@/models/transaction/Transaction";
import WireTransfer from "@/models/wire/WireTransfer";
import AchTransfer from "@/models/ach/AchTransfer";
import ZelleTransfer from "@/models/zelle/ZelleTransfer";

import type { RecentActivity } from "@/types/admin/dashboard.types";

export async function getRecentActivity(): Promise<RecentActivity[]> {
  const [
    transactions,
    wires,
    ach,
    zelle,
  ] = await Promise.all([
    Transaction.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),

    WireTransfer.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),

    AchTransfer.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),

    ZelleTransfer.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),
  ]);

  const activity = [
    ...transactions.map(
      (t): RecentActivity => ({
        id: t._id.toString(),
        type: "transfer",
        title: t.type,
        description: `${t.direction} • ${t.status}`,
        createdAt: t.createdAt.toISOString(),
      })
    ),

    ...wires.map(
      (w): RecentActivity => ({
        id: w._id.toString(),
        type: "wire",
        title: "WIRE",
        description: w.status,
        createdAt: w.createdAt.toISOString(),
      })
    ),

    ...ach.map(
      (a): RecentActivity => ({
        id: a._id.toString(),
        type: "ach",
        title: "ACH",
        description: a.status,
        createdAt: a.createdAt.toISOString(),
      })
    ),

    ...zelle.map(
      (z): RecentActivity => ({
        id: z._id.toString(),
        type: "zelle",
        title: "ZELLE",
        description: z.status,
        createdAt: z.createdAt.toISOString(),
      })
    ),
  ];

  return activity
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 10);
}