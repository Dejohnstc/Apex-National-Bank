"use server";

import { revalidatePath } from "next/cache";

import { deleteExternalAccount } from "@/services/externalAccounts/deleteExternalAccount";

export async function deleteExternalAccountAction(
  id: string
) {
  const result =
    await deleteExternalAccount(id);

  revalidatePath(
    "/dashboard/ach/external-accounts"
  );

  return result;
}