import dbConnect from "@/lib/db/connect";
import Notification from "@/models/notification/Notification";

export async function getUnreadCount(
  userId: string
) {
  await dbConnect();

  return Notification.countDocuments({
    user: userId,
    read: false,
  });
}