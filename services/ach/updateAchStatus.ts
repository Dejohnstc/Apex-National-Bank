import mongoose from "mongoose";

import dbConnect from "@/lib/db/connect";
import AchTransfer from "@/models/ach/AchTransfer";

export type AchStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "RETURNED"
  | "REJECTED"
  | "CANCELLED";

interface UpdateAchStatusInput {
  reference: string;

  newStatus: AchStatus;

  changedBy: string;

  actorType: "ADMIN" | "CUSTOMER" | "SYSTEM";

  note?: string;

  reason?: string;

  session?: mongoose.ClientSession;
}

const ALLOWED_TRANSITIONS: Record<
  AchStatus,
  AchStatus[]
> = {
  PENDING: [
    "PROCESSING",
    "REJECTED",
    "CANCELLED",
  ],

  PROCESSING: [
    "COMPLETED",
    "RETURNED",
  ],

  COMPLETED: [],

  RETURNED: [],

  REJECTED: [],

  CANCELLED: [],
};

export async function updateAchStatus({
  reference,
  newStatus,
  changedBy,
  actorType,
  note,
  reason,
  session,
}: UpdateAchStatusInput) {
  await dbConnect();

  const transfer = await AchTransfer.findOne({
    reference,
  })
    .select("+accountNumber")
    .session(session ?? null);

  if (!transfer) {
    throw new Error("ACH transfer not found.");
  }

  const allowed =
    ALLOWED_TRANSITIONS[
      transfer.status as AchStatus
    ];

  if (!allowed.includes(newStatus)) {
    throw new Error(
      `Cannot change ACH status from ${transfer.status} to ${newStatus}.`
    );
  }

  transfer.status = newStatus;

  const now = new Date();

  const changedByObjectId =
    new mongoose.Types.ObjectId(changedBy);

  switch (newStatus) {
    case "PROCESSING":
      transfer.processingStartedAt = now;
      transfer.processingBy = changedByObjectId;
      transfer.notifications.processing = true;
      break;

    case "COMPLETED":
      transfer.completedAt = now;
      transfer.postedDate = now;
      transfer.completedBy = changedByObjectId;
      transfer.notifications.completed = true;
      break;

    case "RETURNED":
      transfer.returnedAt = now;
      transfer.returnedBy = changedByObjectId;
      transfer.returnReason = reason;
      transfer.notifications.returned = true;
      break;

    case "REJECTED":
      transfer.rejectedAt = now;
      transfer.rejectedBy = changedByObjectId;
      transfer.rejectionReason = reason;
      transfer.notifications.rejected = true;
      break;

    case "CANCELLED":
      transfer.cancelledAt = now;
      transfer.cancelledBy = changedByObjectId;
      transfer.cancellationReason = reason;
      transfer.notifications.cancelled = true;
      break;
  }

  transfer.history.push({
    status: newStatus,
    changedBy: changedByObjectId,
    actorType,
    note,
    createdAt: now,
  });

  await transfer.save({
    session,
  });

  return transfer;
}