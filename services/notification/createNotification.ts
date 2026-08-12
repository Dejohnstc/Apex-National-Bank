import { ClientSession } from "mongoose";

import dbConnect from "@/lib/db/connect";

import Notification from "@/models/notification/Notification";
import { User } from "@/models/user/User";

import { sendNotificationEmail } from "@/services/email/sendNotificationEmail";

interface CreateNotificationInput {
  user: string;

  title: string;

  message: string;

  type?:
    | "INFO"
    | "SUCCESS"
    | "WARNING"
    | "ERROR";

  category?:
    | "WIRE"
    | "ACH"
    | "ZELLE"
    | "ACCOUNT"
    | "CARD"
    | "LOAN"
    | "SECURITY"
    | "BILLPAY"
    | "SYSTEM";

  actionUrl?: string;

  metadata?: Record<string, unknown>;

  session?: ClientSession;
}

export async function createNotification(
  input: CreateNotificationInput
) {
  await dbConnect();

  const notification = {
    user: input.user,
    title: input.title,
    message: input.message,
    type: input.type ?? "INFO",
    category:
      input.category ?? "SYSTEM",
    actionUrl:
      input.actionUrl ?? "",
    metadata:
      input.metadata ?? {},
  };

  let createdNotification;

  if (input.session) {
    const [created] =
      await Notification.create(
        [notification],
        {
          session: input.session,
        }
      );

    createdNotification = created;
  } else {
    createdNotification =
      await Notification.create(
        notification
      );
  }

  /*
   * Email notification.
   *
   * Email failures must never break
   * the in-app notification.
   */
  try {
    const user =
      await User.findById(input.user)
        .select(
          "email emailNotifications"
        )
        .lean();

    if (
      user?.email &&
      user.emailNotifications
    ) {
      await sendNotificationEmail({
        to: user.email,
        title: input.title,
        message: input.message,
        actionUrl:
          input.actionUrl,
      });
    }
  } catch (error) {
    console.error(
      "Failed to send notification email:",
      error
    );
  }

  /*
   * IMPORTANT:
   *
   * Never return the raw Mongoose document
   * across a Server Action boundary.
   */
  return {
    _id:
      createdNotification._id.toString(),

    user:
      createdNotification.user.toString(),

    title:
      createdNotification.title,

    message:
      createdNotification.message,

    type:
      createdNotification.type,

    category:
      createdNotification.category,

    actionUrl:
      createdNotification.actionUrl ?? "",

    read:
      createdNotification.read,

    metadata:
      createdNotification.metadata ?? {},

    createdAt:
      createdNotification.createdAt.toISOString(),

    updatedAt:
      createdNotification.updatedAt.toISOString(),
  };
}