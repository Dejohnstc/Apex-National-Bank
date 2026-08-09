import { z } from "zod";

export const updateAddressSchema = z.object({
  address: z
    .string()
    .trim()
    .min(5, "Street address is required"),

  city: z
    .string()
    .trim()
    .min(2, "City is required"),

  state: z
    .string()
    .trim()
    .min(2, "State is required"),

  postalCode: z
    .string()
    .trim()
    .min(3, "Postal code is required"),

  country: z
    .string()
    .trim()
    .min(2, "Country is required"),
});

export type UpdateAddressInput =
  z.infer<typeof updateAddressSchema>;