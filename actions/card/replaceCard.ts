"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/auth";
import { replaceCard } from "@/services/card/replaceCard";

export async function replaceCardAction(
  cardId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const result = await replaceCard(
    session.user.id,
    cardId
  );

  if (result.success) {
    revalidatePath("/dashboard/cards");
  }

  return result;
}