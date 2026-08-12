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

    notifications: notifications.map(
      (notification) => ({
        id: notification._id.toString(),

        title: notification.title,

        message: notification.message,

        type: notification.type,

        category: notification.category,

        read: notification.read,

        actionUrl:
          notification.actionUrl,

        metadata:
          notification.metadata,

        createdAt:
          notification.createdAt,
      })
    ),
  };
}