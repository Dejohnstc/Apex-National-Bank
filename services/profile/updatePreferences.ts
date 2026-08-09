import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/models/user/User";

import {
  updatePreferencesSchema,
  UpdatePreferencesInput,
} from "@/validators/updatePreferences";

export async function updatePreferences(
  userId: string,
  data: UpdatePreferencesInput
) {
  await connectDB();

  const validated =
    updatePreferencesSchema.parse(data);

  const user =
    await User.findById(userId);

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  user.emailNotifications =
    validated.emailNotifications;

  user.smsNotifications =
    validated.smsNotifications;

  user.marketingEmails =
    validated.marketingEmails;

  await user.save();

  return {
    success: true,
    message: "Preferences updated.",
  };
}