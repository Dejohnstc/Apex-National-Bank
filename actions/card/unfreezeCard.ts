"use server";

import { revalidatePath } from "next/cache";

import { unfreezeCard } from "@/services/card/unfreezeCard";

export async function unfreezeCardAction(
  cardId: string
) {
  const result = await unfreezeCard(cardId);

  revalidatePath("/dashboard/cards");

  return result;
}