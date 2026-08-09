"use server";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import Notification from "@/models/notification/Notification";

export async function markNotificationRead(
  notificationId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return;
  }

  await dbConnect();

  await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      user: session.user.id,
    },
    {
      read: true,
    }
  );
}