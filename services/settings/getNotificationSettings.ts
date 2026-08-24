import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/models/user/User";

export async function getNotificationSettings(
  userId: string
) {
  await connectDB();

  const user = await User.findById(userId)
    .select(
      "emailNotifications smsNotifications marketingEmails"
    )
    .lean();

  if (!user) {
    return null;
  }

  return {
    emailNotifications:
      user.emailNotifications ?? true,

    smsNotifications:
      user.smsNotifications ?? false,

    marketingEmails:
      user.marketingEmails ?? false,
  };
}