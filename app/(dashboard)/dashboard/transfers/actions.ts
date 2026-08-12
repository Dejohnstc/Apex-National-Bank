"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/auth";

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
  data: TransferInput
): Promise<TransferActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    const result = await createTransfer({
      ...data,
      userId: session.user.id,
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