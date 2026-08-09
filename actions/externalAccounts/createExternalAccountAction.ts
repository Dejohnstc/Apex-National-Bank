"use server";

import { revalidatePath } from "next/cache";

import { createExternalAccount } from "@/services/externalAccounts/createExternalAccount";

interface Input {
  nickname: string;
  accountHolderName: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: "CHECKING" | "SAVINGS";
}

export async function createExternalAccountAction(
  input: Input
) {
  const result =
    await createExternalAccount(input);

  revalidatePath(
    "/dashboard/ach/external-accounts"
  );

  return result;
}