import dbConnect from "@/lib/db/connect";
import Notification from "@/models/notification/Notification";

export async function getNotifications(
  userId: string,
  limit = 10
) {
  await dbConnect();

  return Notification.find({
    user: userId,
  })
    .sort({
      read: 1,
      createdAt: -1,
    })
    .limit(limit)
    .lean();
}