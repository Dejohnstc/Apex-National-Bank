import { connectDB } from "@/lib/db/mongodb";

import { Beneficiary } from "@/models/Beneficiary";

import {
  beneficiarySchema,
  BeneficiaryInput,
} from "@/validators/beneficiaries/beneficiarySchema";

export async function updateBeneficiary(
  beneficiaryId: string,
  userId: string,
  data: BeneficiaryInput
) {
  await connectDB();

  const validated =
    beneficiarySchema.parse(data);

  const beneficiary =
    await Beneficiary.findOne({
      _id: beneficiaryId,
      userId,
    });

  if (!beneficiary) {
    return {
      success: false,
      message: "Beneficiary not found.",
    };
  }

  beneficiary.nickname =
    validated.nickname;

  beneficiary.accountName =
    validated.accountName;

  beneficiary.accountNumber =
    validated.accountNumber;

  beneficiary.bankName =
    validated.bankName;

  beneficiary.bankCode =
    validated.bankCode;

  beneficiary.isInternal =
    validated.isInternal;

  beneficiary.isFavorite =
    validated.isFavorite;

  await beneficiary.save();

  return {
    success: true,
    message:
      "Beneficiary updated successfully.",
  };
}