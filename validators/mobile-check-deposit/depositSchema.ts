import { z } from "zod";

export const depositSchema = z.object({
  account: z
    .string()
    .trim()
    .min(1, "Please select an account."),

  amount: z.coerce
    .number()
    .positive("Deposit amount must be greater than zero."),

  frontImage: z
    .string()
    .url("Front image is required."),

  backImage: z
    .string()
    .url("Back image is required."),
});

export type DepositInput = z.input<
  typeof depositSchema
>;

export type DepositData = z.output<
  typeof depositSchema
>;