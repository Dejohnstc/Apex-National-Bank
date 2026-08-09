"use server";

import { revalidatePath } from "next/cache";

import { freezeCard } from "@/services/card/freezeCard";

export async function freezeCardAction(
  cardId: string
) {
  const result = await freezeCard(cardId);

  revalidatePath("/dashboard/cards");

  return result;
}