import dbConnect from "@/lib/db/connect";

import CheckDeposit from "@/models/CheckDeposit";

import { createNotification } from "@/services/notification/createNotification";

type ReviewDecision =
  | "APPROVED"
  | "REJECTED";

interface ReviewDepositInput {
  reviewerId: string;
  depositId: string;
  decision: ReviewDecision;
  reviewNotes?: string;
}

export async function reviewDeposit({
  reviewerId,
  depositId,
  decision,
  reviewNotes = "",
}: ReviewDepositInput) {
  await dbConnect();

  if (
    decision !== "APPROVED" &&
    decision !== "REJECTED"
  ) {
    throw new Error(
      "Invalid review decision."
    );
  }

  const deposit =
    await CheckDeposit.findById(
      depositId
    );

  if (!deposit) {
    throw new Error(
      "Check deposit not found."
    );
  }

  if (
    deposit.status !== "SUBMITTED" &&
    deposit.status !== "UNDER_REVIEW"
  ) {
    throw new Error(
      "This deposit is no longer available for review."
    );
  }

  const now = new Date();

  deposit.status = decision;

  deposit.reviewedBy = reviewerId;

  deposit.reviewedAt = now;

  deposit.reviewNotes =
    reviewNotes.trim();

  if (decision === "APPROVED") {
    deposit.approvedAt = now;
    deposit.rejectedAt = null;
  }

  if (decision === "REJECTED") {
    deposit.rejectedAt = now;
    deposit.approvedAt = null;
  }

  await deposit.save();

  try {
    const formattedAmount =
      new Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency: "USD",
        }
      ).format(deposit.amount);

    await createNotification({
      user: deposit.user.toString(),

      title:
        decision === "APPROVED"
          ? "Check Deposit Approved"
          : "Check Deposit Rejected",

      message:
        decision === "APPROVED"
          ? `Your mobile check deposit of ${formattedAmount} has been approved and is being prepared for funds availability.`
          : `Your mobile check deposit of ${formattedAmount} was rejected.`,

      type:
        decision === "APPROVED"
          ? "SUCCESS"
          : "WARNING",

      category: "ACCOUNT",

      actionUrl:
        `/dashboard/mobile-check-deposit/${deposit._id.toString()}`,

      metadata: {
        depositId:
          deposit._id.toString(),

        reference:
          deposit.reference,

        status: decision,

        reviewNotes:
          deposit.reviewNotes,
      },
    });
  } catch (notificationError) {
    console.error(
      "Check deposit review notification failed:",
      notificationError
    );
  }

  return {
    success: true as const,

    status:
      deposit.status,

    reference:
      deposit.reference,
  };
}