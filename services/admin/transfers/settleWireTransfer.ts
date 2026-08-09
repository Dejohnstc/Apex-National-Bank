import { Types } from "mongoose";

import connectDB from "@/lib/db/connect";

import WireTransfer from "@/models/wire/WireTransfer";
import { Transaction } from "@/models/transaction/Transaction";
import { generateWireTraceNumber } from "@/services/payments/generateWireTraceNumber";
import { debitAccount } from "@/services/payments/debitAccount";
import { createNotification } from "@/services/notification/createNotification";

interface SettleWireTransferInput {
  wireId: string;
  adminId?: string;
}

export async function settleWireTransfer({
  wireId,
  adminId,
}: SettleWireTransferInput) {
  await connectDB();

  const wire = await WireTransfer.findById(wireId);

  if (!wire) {
    throw new Error("Wire transfer not found.");
  }

  /**
   * Prevent duplicate settlement.
   */
  if (wire.status === "COMPLETED") {
    return wire;
  }
if (!wire.traceNumber) {
  wire.traceNumber =
    await generateWireTraceNumber();
}
  if (!wire.transactionId) {
    throw new Error(
      "Wire transfer is missing its linked transaction."
    );
  }

  /**
   * Debit the account NOW.
   */
  const debit = await debitAccount(
    wire.accountId.toString(),
    wire.amount + wire.fee
  );

  /**
   * Update the ledger transaction.
   */
  await Transaction.findByIdAndUpdate(
    wire.transactionId,
    {
      status: "COMPLETED",

      balanceBefore:
        debit.balanceBefore,

      balanceAfter:
        debit.balanceAfter,

      postedAt: new Date(),
    }
  );

  /**
   * Complete the wire.
   */
  wire.status = "COMPLETED";

  wire.completedAt = new Date();

  if (adminId) {
    wire.completedBy =
      new Types.ObjectId(adminId);
  }

  if (wire.notifications) {
    wire.notifications.completed = true;
  }

  wire.history.push({
    status: "COMPLETED",

    changedBy: adminId
      ? new Types.ObjectId(adminId)
      : undefined,

    actorType: "ADMIN",

    note:
      "Wire transfer settled successfully.",

    createdAt: new Date(),
  });

  await wire.save();

  /**
   * Notify customer.
   */
  await createNotification({
    user: wire.userId.toString(),

    title: "Wire Transfer Completed",

    message:
      `Your wire transfer of $${wire.amount.toFixed(
        2
      )} has been completed successfully.`,

    type: "SUCCESS",

    actionUrl:
      `/dashboard/wires/${wire._id}`,
  });

  return wire;
}