"use server";

import { auth } from "@/lib/auth";

import { getPayments } from "@/services/bill-payments/getPayment";

export async function getPaymentsAction() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  return getPayments({
    userId: session.user.id,
  });
}