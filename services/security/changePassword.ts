import { connectDB } from "@/lib/db/mongodb";

import { comparePassword } from "@/lib/auth/password";
import { hashPassword } from "@/lib/auth/password";

import { User } from "@/models/user/User";
import { SecurityAlert } from "@/models/security/SecurityAlert";

import type { ChangePasswordInput } from "@/lib/validation/security/changePassword";

export async function changePassword(
  userId: string,
  input: ChangePasswordInput
) {
  await connectDB();

  const user = await User.findById(userId)
    .select("+password");

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  const validPassword =
    await comparePassword(
      input.currentPassword,
      user.password
    );

  if (!validPassword) {
    return {
      success: false,
      message: "Current password is incorrect.",
    };
  }

  const samePassword =
    await comparePassword(
      input.newPassword,
      user.password
    );

  if (samePassword) {
    return {
      success: false,
      message:
        "Your new password must be different from your current password.",
    };
  }

  user.password = await hashPassword(
    input.newPassword
  );

  user.lastPasswordChanged =
    new Date();

  await user.save();

  await SecurityAlert.create({
    user: user._id,
    type: "PASSWORD_CHANGED",
    title: "Password Changed",
    description:
      "Your account password was successfully changed.",
  });

  return {
    success: true,
  };
}