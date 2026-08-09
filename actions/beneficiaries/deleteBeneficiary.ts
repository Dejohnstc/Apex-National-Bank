"use server";

import { auth } from "@/lib/auth/auth";

import { deleteBeneficiary } from "@/services/beneficiaries/deleteBeneficiary";

export async function deleteBeneficiaryAction(
  beneficiaryId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  return deleteBeneficiary(
    beneficiaryId,
    session.user.id
  );
}