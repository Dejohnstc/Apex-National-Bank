"use server";

import { revalidatePath } from "next/cache";

import { requireStaff } from "@/lib/auth/requireStaff";
import dbConnect from "@/lib/db/connect";

import CheckDeposit from "@/models/CheckDeposit";

import { makeFundsAvailable } from "@/services/mobile-check-deposit/makeFundsAvialable";

interface MakeFundsAvailableActionInput {
  depositId: string;
}

export async function makeFundsAvailableAction({
  depositId,
}: MakeFundsAvailableActionInput) {
  const session =
    await requireStaff();

  try {
    await dbConnect();

    const deposit =
      await CheckDeposit.findById(
        depositId
      ).lean();

    if (!deposit) {
      return {
        success: false as const,
        message:
          "Check deposit not found.",
      };
    }

    if (
      deposit.status !== "APPROVED"
    ) {
      return {
        success: false as const,
        message:
          "Only approved deposits can have funds made available.",
      };
    }

    const result =
      await makeFundsAvailable({
        userId:
          deposit.user.toString(),

        reviewerId:
          session.user.id,

        depositId:
          deposit._id.toString(),
      });

    revalidatePath(
      "/admin/mobile-check-deposits"
    );

    revalidatePath(
      `/admin/mobile-check-deposits/${depositId}`
    );

    revalidatePath(
      "/dashboard"
    );

    revalidatePath(
      "/dashboard/accounts"
    );

    return result;
  } catch (error) {
    console.error(
      "Make funds available failed:",
      error
    );

    return {
      success: false as const,
      message:
        error instanceof Error
          ? error.message
          : "Unable to make deposit funds available.",
    };
  }
}