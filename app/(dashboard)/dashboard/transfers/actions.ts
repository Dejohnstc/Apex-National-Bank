"use server";

import { revalidatePath } from "next/cache";

import { createTransfer } from "@/services/transfer/createTransfer";

interface TransferInput {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
}

type TransferActionResult =
  | {
      success: true;
      reference: string;
    }
  | {
      success: false;
      message: string;
    };

export async function createTransferAction(
  data: TransferInput,
  userId: string
): Promise<TransferActionResult> {
  try {
    const result = await createTransfer({
      ...data,
      userId,
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/accounts");
    revalidatePath("/dashboard/transfers");

    return {
      success: true,
      reference: result.reference,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Transfer failed.",
    };
  }
}