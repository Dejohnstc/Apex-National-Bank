import { Types } from "mongoose";

import connectDB from "@/lib/db/connect";

import { settleWireTransfer } from "./settleWireTransfer";
import { settleAchTransfer } from "./settleAchTransfer";

import AchTransfer from "@/models/ach/AchTransfer";
import WireTransfer from "@/models/wire/WireTransfer";
import ZelleTransfer from "@/models/zelle/ZelleTransfer";
import { Transaction } from "@/models/transaction/Transaction";

import type {
  TransferResult,
  UpdateTransferStatusInput,
} from "./types";

interface TransferDocument {
  status: string;

  save(): Promise<unknown>;

  processingStartedAt?: Date;
  completedAt?: Date;
  rejectedAt?: Date;
  cancelledAt?: Date;
  returnedAt?: Date;

  processingBy?: Types.ObjectId;
  completedBy?: Types.ObjectId;
  rejectedBy?: Types.ObjectId;
  cancelledBy?: Types.ObjectId;
  returnedBy?: Types.ObjectId;

  transactionId?: Types.ObjectId;

  notifications?: {
    approved?: boolean;
    processing?: boolean;
    completed?: boolean;
    rejected?: boolean;
    cancelled?: boolean;
    returned?: boolean;
  };

  history?: {
    status: string;
    changedBy?: Types.ObjectId;
    actorType: "ADMIN" | "CUSTOMER" | "SYSTEM";
    note?: string;
    createdAt: Date;
  }[];

  adminNotes?: string;
}

export async function updateTransferStatus(
  input: UpdateTransferStatusInput
): Promise<TransferResult> {
  await connectDB();

  const {
    id,
    type,
    status,
    adminId,
    note,
  } = input;

  const now = new Date();

  async function updateTransfer(
    transfer: TransferDocument | null
  ): Promise<TransferResult> {
    if (!transfer) {
      return {
        success: false,
        message: "Transfer not found.",
      };
    }

    transfer.status = status;

    switch (status) {
      case "APPROVED":
        if (transfer.notifications) {
          transfer.notifications.approved = true;
        }
        break;

      case "PROCESSING":
        transfer.processingStartedAt = now;

        if (adminId) {
          transfer.processingBy =
            new Types.ObjectId(adminId);
        }

        if (transfer.notifications) {
          transfer.notifications.processing = true;
        }

        break;

      case "COMPLETED":
        /**
         * Wire settlement
         */
        if (type === "WIRE") {
          return {
            success: true,
            data: await settleWireTransfer({
              wireId: id,
              adminId,
            }),
          };
        }

        /**
         * ACH settlement
         */
        if (type === "ACH") {
          return {
            success: true,
            data: await settleAchTransfer({
              achId: id,
              adminId,
            }),
          };
        }

        transfer.completedAt = now;

        if (adminId) {
          transfer.completedBy =
            new Types.ObjectId(adminId);
        }

        if (transfer.notifications) {
          transfer.notifications.completed = true;
        }

        break;

      case "REJECTED":
        transfer.rejectedAt = now;

        if (adminId) {
          transfer.rejectedBy =
            new Types.ObjectId(adminId);
        }

        if (transfer.notifications) {
          transfer.notifications.rejected = true;
        }

        break;

      case "RETURNED":
        transfer.returnedAt = now;

        if (adminId) {
          transfer.returnedBy =
            new Types.ObjectId(adminId);
        }

        if (transfer.notifications) {
          transfer.notifications.returned = true;
        }

        break;

      case "CANCELLED":
        transfer.cancelledAt = now;

        if (adminId) {
          transfer.cancelledBy =
            new Types.ObjectId(adminId);
        }

        if (transfer.notifications) {
          transfer.notifications.cancelled = true;
        }

        break;

      case "FAILED":
        break;
    }

    if (transfer.history) {
      transfer.history.push({
        status,
        changedBy: adminId
          ? new Types.ObjectId(adminId)
          : undefined,
        actorType: "ADMIN",
        note,
        createdAt: now,
      });
    }

    if (note) {
      transfer.adminNotes = note;
    }

    await transfer.save();

    if (transfer.transactionId) {
      await Transaction.findByIdAndUpdate(
        transfer.transactionId.toString(),
        {
          status,
        }
      );
    }

    return {
      success: true,
      data: transfer,
    };
  }

  switch (type) {
    case "ACH":
      return updateTransfer(
        (await AchTransfer.findById(id)) as TransferDocument | null
      );

    case "WIRE":
      return updateTransfer(
        (await WireTransfer.findById(id)) as TransferDocument | null
      );

    case "ZELLE":
      return updateTransfer(
        (await ZelleTransfer.findById(id)) as TransferDocument | null
      );

    case "INTERNAL":
      return updateTransfer(
        (await Transaction.findById(id)) as TransferDocument | null
      );

    default:
      return {
        success: false,
        message: "Unsupported transfer type.",
      };
  }
}