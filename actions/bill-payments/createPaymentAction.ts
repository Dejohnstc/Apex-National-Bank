"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";

import { createPayment } from "@/services/bill-payments/createPayment";

export async function createPaymentAction(
  data: unknown
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const result = await createPayment({
    userId: session.user.id,
    data,
  });

  revalidatePath("/dashboard");
  revalidatePath("/accounts");
  revalidatePath("/transactions");
  revalidatePath("/bill-payments");

  return result;
}