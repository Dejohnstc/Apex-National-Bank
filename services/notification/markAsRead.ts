import dbConnect from "@/lib/db/connect";
import Notification from "@/models/notification/Notification";

export async function markAsRead(
  id: string
) {
  await dbConnect();

  await Notification.findByIdAndUpdate(id, {
    read: true,
  });
}