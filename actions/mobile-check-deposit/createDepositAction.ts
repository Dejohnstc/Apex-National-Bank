"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";

import { createDeposit } from "@/services/mobile-check-deposit/createDeposit";

export async function createDepositAction(
  data: unknown
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const result = await createDeposit({
    userId: session.user.id,
    data,
  });

  revalidatePath("/dashboard");
  revalidatePath("/accounts");
  revalidatePath("/mobile-check-deposit");

  return result;
}