import { z } from "zod";

export const scheduledTransferSchema = z
  .object({
    fromAccountId: z
      .string()
      .min(1, "Select a source account."),

    toAccountId: z
      .string()
      .min(1, "Select a destination account."),

    amount: z
      .number()
      .positive("Amount must be greater than zero.")
      .finite("Enter a valid amount."),

    description: z
      .string()
      .trim()
      .max(
        250,
        "Description cannot exceed 250 characters."
      )
      .default(""),

    scheduledDate: z
      .date()
      .refine(
        (date) => date.getTime() > Date.now(),
        {
          message:
            "Scheduled date must be in the future.",
        }
      ),

    isRecurring: z.boolean().default(false),

    recurringFrequency: z
      .enum([
        "NONE",
        "WEEKLY",
        "BIWEEKLY",
        "MONTHLY",
        "QUARTERLY",
        "YEARLY",
      ])
      .default("NONE"),
  })
  .refine(
    (data) =>
      data.fromAccountId !==
      data.toAccountId,
    {
      message:
        "Source and destination accounts must be different.",
      path: ["toAccountId"],
    }
  )
  .refine(
    (data) =>
      data.isRecurring
        ? data.recurringFrequency !== "NONE"
        : data.recurringFrequency === "NONE",
    {
      message:
        "Select a valid recurring frequency.",
      path: ["recurringFrequency"],
    }
  );

export type ScheduledTransferInput =
  z.infer<typeof scheduledTransferSchema>;