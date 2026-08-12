import dbConnect from "@/lib/db/connect";
import Notification from "@/models/notification/Notification";

export async function markAsRead(
  userId: string,
  notificationId: string
) {
  await dbConnect();

  const notification =
    await Notification.findOneAndUpdate(
      {
        _id: notificationId,
        user: userId,
      },
      {
        $set: {
          read: true,
        },
      },
      {
        new: true,
      }
    );

  if (!notification) {
    return {
      success: false,
      message: "Notification not found.",
    };
  }

  /*
   * Do not return the raw Mongoose document.
   * Server Actions can only pass plain
   * serializable values to Client Components.
   */
  return {
    success: true,

    notification: {
      _id: notification._id.toString(),

      user:
        notification.user.toString(),

      title:
        notification.title,

      message:
        notification.message,

      type:
        notification.type,

      category:
        notification.category,

      actionUrl:
        notification.actionUrl ?? "",

      read:
        Boolean(notification.read),

      metadata:
        notification.metadata
          ? JSON.parse(
              JSON.stringify(
                notification.metadata
              )
            )
          : {},

      createdAt:
        notification.createdAt.toISOString(),

      updatedAt:
        notification.updatedAt.toISOString(),
    },
  };
}