"use server";

import { auth } from "@/lib/auth";

import { getDeposits } from "@/services/mobile-check-deposit/getDeposits";

export async function getDepositsAction() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  return getDeposits({
    userId: session.user.id,
  });
}