import { z } from "zod";

export const statementFilterSchema =
  z.object({
    accountId: z.string().optional(),

    type: z.string().optional(),

    search: z.string().trim().optional(),

    from: z.date().optional(),

    to: z.date().optional(),
  });

export type StatementFilter =
  z.infer<
    typeof statementFilterSchema
  >;