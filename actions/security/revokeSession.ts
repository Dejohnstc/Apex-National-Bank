"use server";

import { auth } from "@/lib/auth/auth";
import { revokeSession } from "@/services/security/revokeSession";

export async function revokeSessionAction(
  sessionId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  return revokeSession(
    session.user.id,
    sessionId
  );
}