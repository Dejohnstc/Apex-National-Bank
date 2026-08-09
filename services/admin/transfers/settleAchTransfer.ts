import mongoose from "mongoose";

import connectDB from "@/lib/db/connect";

import AchTransfer from "@/models/ach/AchTransfer";
import { Account } from "@/models/account/Account";
import { Transaction } from "@/models/transaction/Transaction";

interface SettleAchTransferInput {
  achId: string;
  adminId?: string;
}

export async function settleAchTransfer({
  achId,
  adminId,
}: SettleAchTransferInput) {
  await connectDB();

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const ach = await AchTransfer.findById(achId).session(session);

    if (!ach) {
      throw new Error("ACH transfer not found.");
    }

    if (ach.status === "COMPLETED") {
      throw new Error("ACH transfer has already been settled.");
    }

    const account = await Account.findById(
      ach.requesterAccount
    ).session(session);

    if (!account) {
      throw new Error("Source account not found.");
    }

    const totalDebit =
      ach.amount +
      (ach.fee?.amount ?? 0);

    if (account.availableBalance < totalDebit) {
      throw new Error("Insufficient available balance.");
    }

    const balanceBefore =
      account.availableBalance;

    account.availableBalance -= totalDebit;
    account.currentBalance -= totalDebit;

    await account.save({ session });

    if (ach.transactionId) {
      await Transaction.findByIdAndUpdate(
        ach.transactionId,
        {
          status: "COMPLETED",
          balanceBefore,
          balanceAfter:
            account.availableBalance,
          postedAt: new Date(),
        },
        { session }
      );
    }

    ach.status = "COMPLETED";
    ach.completedAt = new Date();

    if (adminId) {
      ach.completedBy =
        new mongoose.Types.ObjectId(adminId);
    }

   ach.history.push({
  status: "COMPLETED",
  changedBy: adminId
    ? new mongoose.Types.ObjectId(adminId)
    : undefined,
  actorType: "ADMIN",
  note: "ACH transfer settled.",
  createdAt: new Date(),
});

    if (ach.notifications) {
      ach.notifications.completed = true;
    }

    await ach.save({ session });

    await session.commitTransaction();

    return ach;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
}