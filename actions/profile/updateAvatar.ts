"use server";

import { auth } from "@/lib/auth/auth";

import { updateAvatar } from "@/services/profile/updateAvatar";

export async function updateAvatarAction(
  formData: FormData
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return {
      success: false,
      message: "Please select an image.",
    };
  }

  return updateAvatar(
    session.user.id,
    file
  );
}