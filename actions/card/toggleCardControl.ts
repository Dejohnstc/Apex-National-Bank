"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/auth";
import { toggleCardControl } from "@/services/card/toggleCardControl";

type CardControl =
  | "atmEnabled"
  | "onlineEnabled"
  | "contactlessEnabled"
  | "internationalEnabled";

export async function toggleCardControlAction(
  cardId: string,
  control: CardControl,
  enabled: boolean
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const result = await toggleCardControl(
    session.user.id,
    cardId,
    control,
    enabled
  );

  if (result.success) {
    revalidatePath("/dashboard/cards");
  }

  return result;
}