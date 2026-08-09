"use server";

import { auth } from "@/lib/auth/auth";
import { revokeTrustedDevice } from "@/services/security/revokeTrustedDevice";

export async function revokeTrustedDeviceAction(
  deviceId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  return revokeTrustedDevice(
    session.user.id,
    deviceId
  );
}