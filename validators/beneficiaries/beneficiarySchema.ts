import { z } from "zod";

export const beneficiarySchema =
  z.object({
    nickname: z.string().trim().max(50),

    accountName: z
      .string()
      .trim()
      .min(2)
      .max(100),

    accountNumber: z
      .string()
      .trim()
      .min(6)
      .max(30),

    bankName: z
      .string()
      .trim()
      .min(2)
      .max(100),

    bankCode: z
      .string()
      .trim()
      .min(2)
      .max(20),

    isInternal: z.boolean(),

    isFavorite: z.boolean(),
  });

export type BeneficiaryInput =
  z.infer<
    typeof beneficiarySchema
  >;