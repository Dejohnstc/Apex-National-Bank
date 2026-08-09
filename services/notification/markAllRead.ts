import dbConnect from "@/lib/db/connect";
import Notification from "@/models/notification/Notification";

export async function markAllRead(
  userId: string
) {
  await dbConnect();

  await Notification.updateMany(
    {
      user: userId,
      read: false,
    },
    {
      read: true,
    }
  );
}