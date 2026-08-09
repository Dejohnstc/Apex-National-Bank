import { connectDB } from "@/lib/db/mongodb";

import { Beneficiary } from "@/models/Beneficiary";

export async function deleteBeneficiary(
  beneficiaryId: string,
  userId: string
) {
  await connectDB();

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

  await beneficiary.deleteOne();

  return {
    success: true,
    message:
      "Beneficiary deleted successfully.",
  };
}