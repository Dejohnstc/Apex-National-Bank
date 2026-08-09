import { ClientSession } from "mongoose";

import dbConnect from "@/lib/db/connect";

import  Notification  from "@/models/notification/Notification";

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

    actionUrl: input.actionUrl,
  };

  if (input.session) {
    const [created] =
      await Notification.create(
        [notification],
        {
          session: input.session,
        }
      );

    return created;
  }

  return Notification.create(notification);
}