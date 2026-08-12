"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/auth";

import { createScheduledTransfer } from "@/services/transfer/createScheduledTransfer";

import {
  scheduledTransferSchema,
  type ScheduledTransferInput,
} from "@/validators/transfers/scheduledTransferSchema";

type Result =
  | {
      success: true;
      id: string;
      reference: string;
      scheduledDate: Date;
      nextRunAt: Date | null;
    }
  | {
      success: false;
      message: string;
    };

export async function createScheduledTransferAction(
  data: ScheduledTransferInput
): Promise<Result> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    const validated =
      scheduledTransferSchema.parse(data);

    const result =
      await createScheduledTransfer({
        userId: session.user.id,
        data: validated,
      });

    revalidatePath(
      "/dashboard/transfers"
    );

    revalidatePath(
      "/dashboard"
    );

    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to schedule transfer.",
    };
  }
}