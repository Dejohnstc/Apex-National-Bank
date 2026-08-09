"use server";

import { auth } from "@/lib/auth/auth";

import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/lib/validation/profile/updateProfile";

import { updateProfile } from "@/services/profile/updateProfile";

export async function updateProfileAction(
  data: UpdateProfileInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const validated =
    updateProfileSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "Invalid profile data.",
    };
  }

  return updateProfile(
    session.user.id,
    validated.data
  );
}