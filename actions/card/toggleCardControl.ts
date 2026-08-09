"use server";

import { revalidatePath } from "next/cache";

import { toggleCardControl } from "@/services/card/toggleCardControl";

export async function toggleCardControlAction(
  cardId: string,
  control:
    | "atmEnabled"
    | "onlineEnabled"
    | "contactlessEnabled"
    | "internationalEnabled",
  enabled: boolean
) {
  const result =
    await toggleCardControl(
      cardId,
      control,
      enabled
    );

  revalidatePath("/dashboard/cards");

  return result;
}