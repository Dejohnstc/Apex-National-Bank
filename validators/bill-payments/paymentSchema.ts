import { z } from "zod";

export const paymentSchema = z
  .object({
    account: z
      .string()
      .trim()
      .min(1, "Account is required"),

    biller: z
      .string()
      .trim()
      .min(2, "Biller is required")
      .max(100),

    category: z.enum([
      "Electric",
      "Water",
      "Internet",
      "Phone",
      "Insurance",
      "Mortgage",
      "Credit Card",
      "Streaming",
      "Healthcare",
      "Education",
      "Other",
    ]),

    accountNumber: z
      .string()
      .trim()
      .min(3, "Account number is required")
      .max(50),

    amount: z.coerce
      .number()
      .positive("Amount must be greater than zero"),

    memo: z
      .string()
      .trim()
      .max(250)
      .default(""),

    scheduledDate: z.coerce
      .date()
      .optional(),

    isRecurring: z
      .boolean()
      .default(false),

    recurringFrequency: z.enum([
      "NONE",
      "WEEKLY",
      "MONTHLY",
      "QUARTERLY",
      "YEARLY",
    ]),
  })
  .superRefine((data, ctx) => {
    if (
      data.isRecurring &&
      data.recurringFrequency === "NONE"
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["recurringFrequency"],
        message:
          "Recurring frequency is required.",
      });
    }

    if (
      data.scheduledDate &&
      data.scheduledDate < new Date()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["scheduledDate"],
        message:
          "Scheduled date must be in the future.",
      });
    }
  });

export type PaymentInput = z.input<
  typeof paymentSchema
>;

export type PaymentData = z.output<
  typeof paymentSchema
>;