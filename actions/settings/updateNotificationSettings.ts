"use server";

import { auth } from "@/lib/auth";
import { updateNotificationSettings } from "@/services/settings/updateNotificationSettings";

interface NotificationSettingsInput {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  marketingEmails?: boolean;
}

export async function updateNotificationSettingsAction(
  data: NotificationSettingsInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  try {
    return await updateNotificationSettings({
      userId: session.user.id,
      ...data,
    });
  } catch (error) {
    console.error(
      "Failed to update notification settings:",
      error
    );

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to update notification settings.",
    };
  }
}