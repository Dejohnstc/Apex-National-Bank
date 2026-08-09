"use server";

import { revalidatePath } from "next/cache";

import {
  freezeAccount,
  unfreezeAccount,
  closeAccount,
} from "@/services/admin/accounts";

export async function freezeAccountAction(
  accountId: string
) {
  const result = await freezeAccount(accountId);

  revalidatePath("/admin/accounts");
  revalidatePath(`/admin/accounts/${accountId}`);

  return result;
}

export async function unfreezeAccountAction(
  accountId: string
) {
  const result =
    await unfreezeAccount(accountId);

  revalidatePath("/admin/accounts");
  revalidatePath(`/admin/accounts/${accountId}`);

  return result;
}

export async function closeAccountAction(
  accountId: string
) {
  const result =
    await closeAccount(accountId);

  revalidatePath("/admin/accounts");
  revalidatePath(`/admin/accounts/${accountId}`);

  return result;
}