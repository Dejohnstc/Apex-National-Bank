"use server";

import { auth } from "@/lib/auth/auth";

import { updatePreferences } from "@/services/profile/updatePreferences";

import { UpdatePreferencesInput } from "@/validators/updatePreferences";

export async function updatePreferencesAction(
  data: UpdatePreferencesInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  return updatePreferences(
    session.user.id,
    data
  );
}