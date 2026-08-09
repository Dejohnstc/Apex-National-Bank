"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/auth";
import { createCard } from "@/services/card/createCard";

export async function createCardAction(
  accountId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const result = await createCard({
    userId: session.user.id,
    accountId,
  });

  revalidatePath("/dashboard/cards");

  return result;
}