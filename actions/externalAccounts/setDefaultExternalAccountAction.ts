"use server";

import { revalidatePath } from "next/cache";

import { setDefaultExternalAccount } from "@/services/externalAccounts/setDefaultExternalAccount";

export async function setDefaultExternalAccountAction(
  id: string
) {
  const result =
    await setDefaultExternalAccount(id);

  revalidatePath(
    "/dashboard/ach/external-accounts"
  );

  return result;
}