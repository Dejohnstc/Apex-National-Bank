"use server";

import { auth } from "@/lib/auth/auth";

import { markAsRead } from "@/services/notification/markAsRead";

export async function markNotificationRead(
  notificationId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  return markAsRead(
    session.user.id,
    notificationId
  );
}