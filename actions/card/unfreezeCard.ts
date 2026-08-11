"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/auth";
import { unfreezeCard } from "@/services/card/unfreezeCard";

export async function unfreezeCardAction(
  cardId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const result = await unfreezeCard(
    session.user.id,
    cardId
  );

  if (result.success) {
    revalidatePath("/dashboard/cards");
  }

  return result;
}