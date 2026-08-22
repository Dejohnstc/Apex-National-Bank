"use server";

import { revalidatePath } from "next/cache";

import { createWireTransfer } from "@/services/wire/createWireTransfer";

interface CreateWireTransferActionInput {
  accountId: string;

  type:
    | "DOMESTIC"
    | "INTERNATIONAL";

  recipientName: string;
  bankName: string;
  accountNumber: string;

  routingNumber?: string;
  swiftCode?: string;
  country?: string;

  amount: number;

  purpose?: string;
}

export async function createWireTransferAction(
  data: CreateWireTransferActionInput
) {
  try {
    const result =
      await createWireTransfer(data);

    /*
     * Do not refresh the customer's
     * wire pages when validation fails.
     *
     * This keeps limit errors on the
     * current page instead of causing
     * an unnecessary route refresh.
     */
    if (!result.success) {
      return result;
    }

    revalidatePath(
      "/dashboard/wires"
    );

    revalidatePath(
      "/dashboard/accounts"
    );

    revalidatePath(
      "/dashboard/transactions"
    );

    return result;
  } catch (error) {
    console.error(
      "Create wire transfer action failed:",
      error
    );

    return {
      success: false as const,
      message:
        error instanceof Error
          ? error.message
          : "Unable to submit wire transfer.",
    };
  }
}