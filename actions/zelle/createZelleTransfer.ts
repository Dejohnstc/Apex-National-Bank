"use server";

import { auth } from "@/lib/auth/auth";

import { createZelleTransfer as createTransfer } from "@/services/zelle/createZelleTransfer";

import { CreateZelleTransferInput } from "@/types/zelle-transfer";

export async function createZelleTransferAction(
  input: CreateZelleTransferInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  return createTransfer(
    session.user.id,
    input
  );
}