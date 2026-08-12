import dbConnect from "@/lib/db/connect";
import Notification from "@/models/notification/Notification";

export async function markAllRead(
  userId: string
) {
  await dbConnect();

  const result =
    await Notification.updateMany(
      {
        user: userId,
        read: false,
      },
      {
        $set: {
          read: true,
        },
      }
    );

  return {
    success: true,
    modifiedCount: result.modifiedCount,
  };
}