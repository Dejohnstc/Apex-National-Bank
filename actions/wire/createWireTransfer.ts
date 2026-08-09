"use server";

import { revalidatePath } from "next/cache";

import { createWireTransfer } from "@/services/wire/createWireTransfer";

export async function createWireTransferAction(
  data: {
    accountId: string;
    type: "DOMESTIC" | "INTERNATIONAL";

    recipientName: string;
    bankName: string;
    accountNumber: string;

    routingNumber?: string;
    swiftCode?: string;
    country?: string;

    amount: number;
    purpose?: string;
  }
) {
  const result =
    await createWireTransfer(data);

  revalidatePath("/dashboard/wires");
  revalidatePath("/dashboard/accounts");
  revalidatePath("/dashboard/transactions");

  return result;
}