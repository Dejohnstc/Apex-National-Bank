"use server";

import { revalidatePath } from "next/cache";

import { requireStaff } from "@/lib/auth/requireStaff";
import { reviewDeposit } from "@/services/mobile-check-deposit/reviewDeposit";

type ReviewDecision =
  | "APPROVED"
  | "REJECTED";

interface ReviewDepositActionInput {
  depositId: string;
  decision: ReviewDecision;
  reviewNotes?: string;
}

export async function reviewDepositAction({
  depositId,
  decision,
  reviewNotes,
}: ReviewDepositActionInput) {
  const session = await requireStaff();

  try {
    const result =
      await reviewDeposit({
        reviewerId: session.user.id,
        depositId,
        decision,
        reviewNotes,
      });

    revalidatePath(
      "/dashboard/mobile-check-deposit"
    );

    revalidatePath(
      `/dashboard/mobile-check-deposit/${depositId}`
    );

    return result;
  } catch (error) {
    return {
      success: false as const,
      message:
        error instanceof Error
          ? error.message
          : "Unable to review deposit.",
    };
  }
}