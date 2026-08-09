import { z } from "zod";

export const updatePreferencesSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  marketingEmails: z.boolean(),
});

export type UpdatePreferencesInput =
  z.infer<typeof updatePreferencesSchema>;