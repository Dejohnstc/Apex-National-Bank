"use server";

import { auth } from "@/lib/auth/auth";

import { getScheduledTransfer } from "@/services/transfer/getScheduledTransfer";

export async function getScheduledTransferAction(
  transferId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false as const,
      message: "Unauthorized.",
    };
  }

  const transfer =
    await getScheduledTransfer(
      session.user.id,
      transferId
    );

  if (!transfer) {
    return {
      success: false as const,
      message: "Scheduled transfer not found.",
    };
  }

  return {
    success: true as const,
    transfer: {
      ...transfer,

      _id: transfer._id.toString(),

      user: transfer.user.toString(),

      fromAccount:
        transfer.fromAccount &&
        typeof transfer.fromAccount === "object"
          ? {
              id: transfer.fromAccount._id.toString(),
              nickname:
                transfer.fromAccount.nickname,
              accountNumber:
                transfer.fromAccount.accountNumber,
              type:
                transfer.fromAccount.type,
              currency:
                transfer.fromAccount.currency,
            }
          : null,

      toAccount:
        transfer.toAccount &&
        typeof transfer.toAccount === "object"
          ? {
              id: transfer.toAccount._id.toString(),
              nickname:
                transfer.toAccount.nickname,
              accountNumber:
                transfer.toAccount.accountNumber,
              type:
                transfer.toAccount.type,
              currency:
                transfer.toAccount.currency,
            }
          : null,

      scheduledDate:
        transfer.scheduledDate.toISOString(),

      nextRunAt:
        transfer.nextRunAt
          ? transfer.nextRunAt.toISOString()
          : null,

      lastRunAt:
        transfer.lastRunAt
          ? transfer.lastRunAt.toISOString()
          : null,

      completedAt:
        transfer.completedAt
          ? transfer.completedAt.toISOString()
          : null,

      cancelledAt:
        transfer.cancelledAt
          ? transfer.cancelledAt.toISOString()
          : null,

      createdAt:
        transfer.createdAt.toISOString(),

      updatedAt:
        transfer.updatedAt.toISOString(),
    },
  };
}