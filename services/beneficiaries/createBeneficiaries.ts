import { connectDB } from "@/lib/db/mongodb";

import { Beneficiary } from "@/models/Beneficiary";

import {
  beneficiarySchema,
  BeneficiaryInput,
} from "@/validators/beneficiaries/beneficiarySchema";

export async function createBeneficiary(
  userId: string,
  data: BeneficiaryInput
) {
  await connectDB();

  const validated =
    beneficiarySchema.parse(data);

  const exists =
    await Beneficiary.findOne({
      userId,
      accountNumber:
        validated.accountNumber,
      bankCode: validated.bankCode,
    });

  if (exists) {
    return {
      success: false,
      message:
        "Beneficiary already exists.",
    };
  }

  await Beneficiary.create({
    userId,
    ...validated,
  });

  return {
    success: true,
    message:
      "Beneficiary created successfully.",
  };
}