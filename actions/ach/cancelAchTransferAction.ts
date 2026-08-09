"use server";

import { revalidatePath } from "next/cache";

import { cancelAchTransfer } from "@/services/ach/cancelAchTransfer";

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function cancelAchTransferAction(
  reference: string
): Promise<ActionResult> {
  const result = await cancelAchTransfer(reference);

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  revalidatePath("/dashboard/ach");
  revalidatePath("/dashboard/ach/history");
  revalidatePath(`/dashboard/ach/${reference}`);
  revalidatePath("/dashboard/accounts");
  revalidatePath("/dashboard/transactions");

  return {
    success: true,
  };
}