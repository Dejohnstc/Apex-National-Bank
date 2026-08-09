import AchTransfer from "@/models/ach/AchTransfer";
import WireTransfer from "@/models/wire/WireTransfer";
import ZelleTransfer from "@/models/zelle/ZelleTransfer";
import { Transaction } from "@/models/transaction/Transaction";

import connectDB from "@/lib/db/connect";

import type {
  AdminTransfer,
  TransferResult,
  TransferType,
} from "./types";

export async function getTransferById(
  id: string,
  type: TransferType
): Promise<TransferResult<AdminTransfer>> {
  await connectDB();

  let transfer: Record<string, unknown> | null =
    null;

  switch (type) {
    case "ACH":
      transfer =
        (await AchTransfer.findById(id).lean()) as Record<
          string,
          unknown
        > | null;
      break;

    case "WIRE":
      transfer =
        (await WireTransfer.findById(id).lean()) as Record<
          string,
          unknown
        > | null;
      break;

    case "ZELLE":
      transfer =
        (await ZelleTransfer.findById(id).lean()) as Record<
          string,
          unknown
        > | null;
      break;

    case "INTERNAL":
      transfer =
        (await Transaction.findById(id).lean()) as Record<
          string,
          unknown
        > | null;
      break;

    default:
      return {
        success: false,
        message: "Unsupported transfer type.",
      };
  }

  if (!transfer) {
    return {
      success: false,
      message: "Transfer not found.",
    };
  }

  const adminTransfer: AdminTransfer = {
    id: String(transfer._id),

    _id: String(transfer._id),

    reference: String(
      transfer.reference ?? ""
    ),

    customerName: String(
      transfer.senderName ??
        transfer.requesterName ??
        transfer.customerName ??
        transfer.user ??
        "Customer"
    ),

    recipientName: String(
      transfer.recipientName ??
        transfer.recipientEmail ??
        transfer.receiverName ??
        transfer.beneficiaryName ??
        transfer.description ??
        transfer.recipient ??
        "N/A"
    ),

    type,

    status: String(
      transfer.status ?? "PENDING"
    ),

    amount: Number(
      transfer.amount ?? 0
    ),

    currency: String(
      transfer.currency ?? "USD"
    ),

    createdAt:
      transfer.createdAt as
        | Date
        | string,

    updatedAt:
      transfer.updatedAt as
        | Date
        | string,

    fee: Number(
      transfer.fee ?? 0
    ),

    memo: String(
      transfer.memo ??
        transfer.purpose ??
        transfer.description ??
        ""
    ),

    accountId:
      transfer.accountId !== undefined
        ? String(transfer.accountId)
        : undefined,

    userId:
      transfer.userId !== undefined
        ? String(transfer.userId)
        : undefined,
  };

  return {
    success: true,
    data: adminTransfer,
  };
}