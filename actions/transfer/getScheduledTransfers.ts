"use server";

import { auth } from "@/lib/auth/auth";

import { getScheduledTransfers } from "@/services/transfer/getScheduledTransfers";

export async function getScheduledTransfersAction() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false as const,
      message: "Unauthorized.",
      transfers: [],
    };
  }

  const transfers =
    await getScheduledTransfers(
      session.user.id
    );

  return {
    success: true as const,
    transfers: transfers.map((transfer) => ({
      id: transfer._id.toString(),

      fromAccount:
        transfer.fromAccount.toString(),

      toAccount:
        transfer.toAccount.toString(),

      amount: transfer.amount,

      description:
        transfer.description,

      reference:
        transfer.reference,

      scheduledDate:
        transfer.scheduledDate.toISOString(),

      isRecurring:
        transfer.isRecurring,

      recurringFrequency:
        transfer.recurringFrequency,

      nextRunAt:
        transfer.nextRunAt
          ? transfer.nextRunAt.toISOString()
          : null,

      lastRunAt:
        transfer.lastRunAt
          ? transfer.lastRunAt.toISOString()
          : null,

      status:
        transfer.status,

      failureReason:
        transfer.failureReason,

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
    })),
  };
}