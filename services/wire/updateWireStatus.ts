import { ClientSession, Types } from "mongoose";

import WireTransfer from "@/models/wire/WireTransfer";

interface UpdateWireStatusInput {
  wireId: string;

  status:
    | "APPROVED"
    | "PROCESSING"
    | "COMPLETED"
    | "REJECTED"
    | "FAILED"
    | "RETURNED"
    | "CANCELLED";

  changedBy?: Types.ObjectId;

  actorType: "ADMIN" | "CUSTOMER" | "SYSTEM";

  note?: string;

  reason?: string;

  session?: ClientSession;
}

export async function updateWireStatus({
  wireId,
  status,
  changedBy,
  actorType,
  note,
  reason,
  session,
}: UpdateWireStatusInput) {
  const wire = await WireTransfer.findById(
    wireId,
    null,
    session ? { session } : undefined
  );

  if (!wire) {
    throw new Error("Wire transfer not found.");
  }

  switch (status) {
    case "APPROVED":
      wire.status = status;
      break;

    case "PROCESSING":
      wire.status = status;
      wire.processingStartedAt = new Date();
      wire.processingBy = changedBy;
      break;

    case "COMPLETED":
      wire.status = status;
      wire.completedAt = new Date();
      wire.completedBy = changedBy;
      break;

    case "REJECTED":
      wire.status = status;
      wire.rejectedAt = new Date();
      wire.rejectedBy = changedBy;
      wire.rejectionReason = reason;
      break;

    case "FAILED":
      wire.status = status;
      break;

    case "RETURNED":
      wire.status = status;
      wire.returnedAt = new Date();
      wire.returnedBy = changedBy;
      wire.returnReason = reason;
      break;

    case "CANCELLED":
      wire.status = status;
      wire.cancelledAt = new Date();
      wire.cancelledBy = changedBy;
      wire.cancellationReason = reason;
      break;
  }

  wire.history.push({
    status,
    changedBy,
    actorType,
    note,
    createdAt: new Date(),
  });

  await wire.save(
    session ? { session } : undefined
  );

  return wire;
}