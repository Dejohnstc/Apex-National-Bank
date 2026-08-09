import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name is required"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name is required"),

  email: z
    .string()
    .email(),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number is required"),

  dateOfBirth: z
    .string()
    .optional()
    .nullable(),

  occupation: z
    .string()
    .trim()
    .optional()
    .nullable(),

  maritalStatus: z
    .string()
    .trim()
    .optional()
    .nullable(),
});

export type UpdateProfileInput =
  z.infer<typeof updateProfileSchema>;