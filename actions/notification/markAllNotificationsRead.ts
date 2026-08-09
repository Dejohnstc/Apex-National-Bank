"use server";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import Notification from "@/models/notification/Notification";

export async function markAllNotificationsRead() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
    };
  }

  await dbConnect();

  await Notification.updateMany(
    {
      user: session.user.id,
      read: false,
    },
    {
      read: true,
    }
  );

  return {
    success: true,
  };
}