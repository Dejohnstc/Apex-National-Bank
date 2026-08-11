"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/auth";
import { updateCardLimits } from "@/services/card/updateCardLimits";

export async function updateCardLimitsAction(
  cardId: string,
  limit: number
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const result = await updateCardLimits(
    session.user.id,
    cardId,
    limit
  );

  if (result.success) {
    revalidatePath("/dashboard/cards");
  }

  return result;
}