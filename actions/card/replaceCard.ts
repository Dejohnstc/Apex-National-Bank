"use server";

import { revalidatePath } from "next/cache";

import { replaceCard } from "@/services/card/replaceCard";

export async function replaceCardAction(
  cardId: string
) {
  const result =
    await replaceCard(cardId);

  revalidatePath("/dashboard/cards");

  return result;
}