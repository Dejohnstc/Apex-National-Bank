"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/auth";

import { cancelScheduledTransfer } from "@/services/transfer/cancelScheduledTransfer";

export async function cancelScheduledTransferAction(
  transferId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  try {
    const result =
      await cancelScheduledTransfer(
        session.user.id,
        transferId
      );

    revalidatePath(
      "/dashboard/transfers"
    );

    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to cancel scheduled transfer.",
    };
  }
}