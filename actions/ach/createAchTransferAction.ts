"use server";

import { revalidatePath } from "next/cache";

import {
  createAchTransfer,
  type CreateAchTransferInput,
} from "@/services/ach/createAchTransfer";

interface ActionResult {
  success: boolean;
  reference?: string;
  error?: string;
}

export async function createAchTransferAction(
  data: CreateAchTransferInput
): Promise<ActionResult> {
  try {
    const result = await createAchTransfer(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    revalidatePath("/dashboard/accounts");
    revalidatePath("/dashboard/transactions");
    revalidatePath("/dashboard/ach");
    revalidatePath("/dashboard/ach/send");
    revalidatePath("/dashboard/ach/history");

    return {
      success: true,
      reference: result.reference,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to process ACH transfer.",
    };
  }
}