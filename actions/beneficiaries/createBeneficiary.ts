"use server";

import { auth } from "@/lib/auth/auth";

import { createBeneficiary } from "@/services/beneficiaries/createBeneficiaries";

import { BeneficiaryInput } from "@/validators/beneficiaries/beneficiarySchema";

export async function createBeneficiaryAction(
  data: BeneficiaryInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  return createBeneficiary(
    session.user.id,
    data
  );
}