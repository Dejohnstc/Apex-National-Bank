"use server";

import { revalidatePath } from "next/cache";

import {
  reverseTransaction,
} from "@/services/admin/transactions";

export async function reverseTransactionAction(
  transactionId: string
) {
  const result =
    await reverseTransaction(
      transactionId
    );

  revalidatePath(
    "/admin/transactions"
  );

  revalidatePath(
    `/admin/transactions/${transactionId}`
  );

  return result;
}