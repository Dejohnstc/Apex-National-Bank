"use server";

import { auth } from "@/lib/auth/auth";

import {
  updateAddressSchema,
  type UpdateAddressInput,
} from "@/lib/validation/profile/updateAddress";

import { updateAddress } from "@/services/profile/updateAddress";

export async function updateAddressAction(
  data: UpdateAddressInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const validated =
    updateAddressSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "Invalid address.",
    };
  }

  return updateAddress(
    session.user.id,
    validated.data
  );
}