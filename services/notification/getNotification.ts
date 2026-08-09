import dbConnect from "@/lib/db/connect";
import Notification from "@/models/notification/Notification";

export async function getNotifications(
  userId: string
) {
  await dbConnect();

  return Notification.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .lean();
}