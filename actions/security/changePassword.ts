"use server";

import { auth } from "@/lib/auth/auth";

import { changePassword } from "@/services/security/changePassword";

import type { ChangePasswordInput } from "@/lib/validation/security/changePassword";

export async function changePasswordAction(
  input: ChangePasswordInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  return changePassword(
    session.user.id,
    input
  );
}