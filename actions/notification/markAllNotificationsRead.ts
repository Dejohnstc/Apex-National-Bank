"use server";

import { auth } from "@/lib/auth/auth";

import { markAllRead } from "@/services/notification/markAllRead";

export async function markAllNotificationsRead() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  return markAllRead(session.user.id);
}