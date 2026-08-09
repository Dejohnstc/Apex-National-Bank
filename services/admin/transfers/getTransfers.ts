import { getAchTransfers } from "./ach/getAchTransfers";
import { getInternalTransfers } from "./internal/getInternalTransfers";
import { getWireTransfers } from "./wire/getWireTransfers";
import { getZelleTransfers } from "./zelle/getZelleTransfers";

import type {
  AdminTransfer,
  TransferQuery,
  TransferResult,
  TransferSummary,
} from "./types";

export async function getTransfers(
  query: TransferQuery
): Promise<TransferResult<AdminTransfer[]>> {

  // Existing single-type behavior
  if (query.type !== "ALL") {
    switch (query.type) {
      case "ACH":
        return getAchTransfers(query);

      case "WIRE":
        return getWireTransfers(query);

      case "ZELLE":
        return getZelleTransfers(query);

      case "INTERNAL":
        return getInternalTransfers(query);
    }
  }

  const [
    ach,
    wire,
    zelle,
    internal,
  ] = await Promise.all([
    getAchTransfers({
      ...query,
      type: "ACH",
    }),

    getWireTransfers({
      ...query,
      type: "WIRE",
    }),

    getZelleTransfers({
      ...query,
      type: "ZELLE",
    }),

    getInternalTransfers({
      ...query,
      type: "INTERNAL",
    }),
  ]);

  const transfers: AdminTransfer[] = [
    ...(ach.data ?? []),
    ...(wire.data ?? []),
    ...(zelle.data ?? []),
    ...(internal.data ?? []),
  ].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  const summary: TransferSummary = {
    totalTransfers: transfers.length,

    totalVolume: transfers.reduce(
      (sum, transfer) =>
        sum + transfer.amount,
      0
    ),

    pendingTransfers: transfers.filter(
      (t) => t.status === "PENDING"
    ).length,

    processingTransfers: transfers.filter(
      (t) => t.status === "PROCESSING"
    ).length,

    completedTransfers: transfers.filter(
      (t) => t.status === "COMPLETED"
    ).length,

    failedTransfers: transfers.filter(
      (t) =>
        t.status === "FAILED" ||
        t.status === "REJECTED" ||
        t.status === "RETURNED"
    ).length,

    cancelledTransfers: transfers.filter(
      (t) => t.status === "CANCELLED"
    ).length,
  };

  return {
    success: true,
    data: transfers,
    summary,
  };
}