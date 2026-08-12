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
  await requireStaff();

  try {
    await dbConnect();

    /*
     * Find the approved deposit.
     *
     * The staff member is authorized through
     * requireStaff(); the deposit owner comes
     * from the deposit itself.
     */
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

    if (deposit.status !== "APPROVED") {
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

        depositId:
          deposit._id.toString(),
      });

    revalidatePath(
      "/dashboard/mobile-check-deposit"
    );

    revalidatePath(
      `/dashboard/mobile-check-deposit/${depositId}`
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