import { connectDB } from "@/lib/db/mongodb";

import { User } from "@/models/user/User";

import type { UpdateAddressInput } from "@/lib/validation/profile/updateAddress";

export async function updateAddress(
  userId: string,
  data: UpdateAddressInput
) {
  await connectDB();

  const user =
    await User.findById(userId);

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  user.address = data.address;
  user.city = data.city;
  user.state = data.state;
  user.postalCode = data.postalCode;
  user.country = data.country;

  await user.save();

  return {
    success: true,
    message:
      "Address updated successfully.",
  };
}