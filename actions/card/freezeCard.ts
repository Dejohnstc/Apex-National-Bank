"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/auth";
import { freezeCard } from "@/services/card/freezeCard";

export async function freezeCardAction(
  cardId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const result = await freezeCard(
    session.user.id,
    cardId
  );

  if (result.success) {
    revalidatePath("/dashboard/cards");
  }

  return result;
}