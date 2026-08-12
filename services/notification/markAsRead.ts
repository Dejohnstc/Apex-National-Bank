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

  return {
    success: true,
    notification,
  };
}