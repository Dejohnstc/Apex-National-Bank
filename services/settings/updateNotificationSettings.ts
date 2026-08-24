import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/models/user/User";

interface UpdateNotificationSettingsInput {
  userId: string;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  marketingEmails?: boolean;
}

export async function updateNotificationSettings({
  userId,
  emailNotifications,
  smsNotifications,
  marketingEmails,
}: UpdateNotificationSettingsInput) {
  await connectDB();

  const update: Record<string, boolean> = {};

  if (
    emailNotifications !== undefined
  ) {
    update.emailNotifications =
      emailNotifications;
  }

  if (
    smsNotifications !== undefined
  ) {
    update.smsNotifications =
      smsNotifications;
  }

  if (
    marketingEmails !== undefined
  ) {
    update.marketingEmails =
      marketingEmails;
  }

  if (Object.keys(update).length === 0) {
    return {
      success: false,
      message: "No settings were provided.",
    };
  }

  const user =
    await User.findByIdAndUpdate(
      userId,
      {
        $set: update,
      },
      {
        new: true,
      }
    )
      .select(
        "emailNotifications smsNotifications marketingEmails"
      )
      .lean();

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  return {
    success: true,

    settings: {
      emailNotifications:
        user.emailNotifications ?? true,

      smsNotifications:
        user.smsNotifications ?? false,

      marketingEmails:
        user.marketingEmails ?? false,
    },
  };
}