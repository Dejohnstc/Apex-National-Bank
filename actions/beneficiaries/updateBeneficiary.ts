"use server";

import { auth } from "@/lib/auth/auth";

import { updateBeneficiary } from "@/services/beneficiaries/updateBeneficiary";

import { BeneficiaryInput } from "@/validators/beneficiaries/beneficiarySchema";

export async function updateBeneficiaryAction(
  beneficiaryId: string,
  data: BeneficiaryInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  return updateBeneficiary(
    beneficiaryId,
    session.user.id,
    data
  );
}