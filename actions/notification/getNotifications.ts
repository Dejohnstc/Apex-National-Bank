"use server";

import { auth } from "@/lib/auth/auth";

import { getNotifications } from "@/services/notification/getNotifications";
import { getUnreadCount } from "@/services/notification/getUnreadCount";

export async function getNotificationData() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      unreadCount: 0,
      notifications: [],
    };
  }

  const [notifications, unreadCount] =
    await Promise.all([
      getNotifications(session.user.id),
      getUnreadCount(session.user.id),
    ]);

  return {
    unreadCount,

    notifications: notifications.map((n) => ({
      id: String(n._id),

      title: n.title,

      message: n.message,

      type: n.type,

      category: n.category,

      read: n.read,

      actionUrl: n.actionUrl,

      createdAt: n.createdAt,
    })),
  };
}