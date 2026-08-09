import AchTransfer from "@/models/ach/AchTransfer";
import WireTransfer from "@/models/wire/WireTransfer";
import ZelleTransfer from "@/models/zelle/ZelleTransfer";
import { Transaction } from "@/models/transaction/Transaction";

export async function getTransferStats() {
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const [
    achPending,
    achProcessing,
    achCompletedToday,

    wirePending,
    wireApproved,
    wireProcessing,
    wireCompletedToday,

    zellePending,
    zelleCompletedToday,

    internalPending,
    internalCompletedToday,
  ] = await Promise.all([
    // ACH
    AchTransfer.countDocuments({
      status: "PENDING",
    }),

    AchTransfer.countDocuments({
      status: "PROCESSING",
    }),

    AchTransfer.countDocuments({
      status: "COMPLETED",
      completedAt: {
        $gte: startOfToday,
      },
    }),

    // Wire
    WireTransfer.countDocuments({
      status: "PENDING",
    }),

    WireTransfer.countDocuments({
      status: "APPROVED",
    }),

    WireTransfer.countDocuments({
      status: "PROCESSING",
    }),

    WireTransfer.countDocuments({
      status: "COMPLETED",
      completedAt: {
        $gte: startOfToday,
      },
    }),

    // Zelle
    ZelleTransfer.countDocuments({
      status: "PENDING",
    }),

    ZelleTransfer.countDocuments({
      status: "COMPLETED",
      createdAt: {
        $gte: startOfToday,
      },
    }),

    // INTERNAL TRANSFERS
    Transaction.countDocuments({
      type: "TRANSFER",
      status: {
        $in: ["PENDING", "PROCESSING"],
      },
    }),

    Transaction.countDocuments({
      type: "TRANSFER",
      status: "COMPLETED",
      postedAt: {
        $gte: startOfToday,
      },
    }),
  ]);

  return {
    ach: {
      pending: achPending,
      processing: achProcessing,
      completedToday: achCompletedToday,
    },

    wire: {
      pending: wirePending,
      approved: wireApproved,
      processing: wireProcessing,
      completedToday: wireCompletedToday,
    },

    internal: {
      pending: internalPending,
      completedToday: internalCompletedToday,
    },

    zelle: {
      pending: zellePending,
      completedToday: zelleCompletedToday,
    },
  };
}