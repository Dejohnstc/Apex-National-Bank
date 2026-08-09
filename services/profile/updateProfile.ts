import { connectDB } from "@/lib/db/mongodb";

import { User } from "@/models/user/User";

import type { UpdateProfileInput } from "@/lib/validation/profile/updateProfile";

export async function updateProfile(
  userId: string,
  data: UpdateProfileInput
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

  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.phone = data.phone;
  user.occupation =
    data.occupation ?? "";
  user.maritalStatus =
    data.maritalStatus ?? "";

  if (data.dateOfBirth) {
    user.dateOfBirth = new Date(
      data.dateOfBirth
    );
  }

  await user.save();

  return {
    success: true,
    message:
      "Profile updated successfully.",
  };
}