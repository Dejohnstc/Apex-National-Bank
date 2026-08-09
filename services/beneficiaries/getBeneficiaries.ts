import { connectDB } from "@/lib/db/mongodb";
import { Beneficiary } from "@/models/Beneficiary";

export async function getBeneficiaries(
  userId: string
) {
  await connectDB();

  const beneficiaries =
    await Beneficiary.find({
      userId,
    })
      .sort({
        isFavorite: -1,
        createdAt: -1,
      })
      .lean();

  return beneficiaries;
}