"use server";

import { revalidatePath } from "next/cache";

import { updateCardLimits } from "@/services/card/updateCardLimits";

export async function updateCardLimitsAction(
  cardId: string,
  limit: number
) {
  const result =
    await updateCardLimits(
      cardId,
      limit
    );

  revalidatePath("/dashboard/cards");

  return result;
}