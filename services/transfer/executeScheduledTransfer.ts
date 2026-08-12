import mongoose from "mongoose";

import { connectDB } from "@/lib/db/mongodb";

import ScheduledTransfer from "@/models/transfer/ScheduledTransfer";
import { Account } from "@/models/account/Account";

import { generateReference } from "@/lib/bank/generateReference";
import { createTransaction } from "@/services/transaction/createTransaction";

type RecurringFrequency =
  | "NONE"
  | "WEEKLY"
  | "BIWEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "YEARLY";

function getNextRunDate(
  currentDate: Date,
  frequency: RecurringFrequency
): Date | null {
  const next = new Date(currentDate);

  switch (frequency) {
    case "WEEKLY":
      next.setDate(next.getDate() + 7);
      return next;

    case "BIWEEKLY":
      next.setDate(next.getDate() + 14);
      return next;

    case "MONTHLY":
      next.setMonth(next.getMonth() + 1);
      return next;

    case "QUARTERLY":
      next.setMonth(next.getMonth() + 3);
      return next;

    case "YEARLY":
      next.setFullYear(
        next.getFullYear() + 1
      );
      return next;

    case "NONE":
    default:
      return null;
  }
}

export async function executeScheduledTransfer(
  transferId: string
) {
  await connectDB();

  const session =
    await mongoose.startSession();

  try {
    session.startTransaction();

    /*
     * Claim the scheduled transfer first.
     *
     * The status check prevents the same transfer
     * from being executed twice.
     */
    const transfer =
      await ScheduledTransfer.findOneAndUpdate(
        {
          _id: transferId,
          status: "SCHEDULED",
          nextRunAt: {
            $lte: new Date(),
          },
        },
        {
          $set: {
            status: "PROCESSING",
          },
        },
        {
          new: true,
          session,
        }
      );

    if (!transfer) {
      throw new Error(
        "Scheduled transfer is not ready for processing."
      );
    }

    const fromAccount =
      await Account.findOne({
        _id: transfer.fromAccount,
        user: transfer.user,
        status: "ACTIVE",
      }).session(session);

    if (!fromAccount) {
      throw new Error(
        "Source account not found or inactive."
      );
    }

    const toAccount =
      await Account.findOne({
        _id: transfer.toAccount,
        status: "ACTIVE",
      }).session(session);

    if (!toAccount) {
      throw new Error(
        "Destination account not found or inactive."
      );
    }

    if (
      fromAccount._id.toString() ===
      toAccount._id.toString()
    ) {
      throw new Error(
        "Source and destination accounts must be different."
      );
    }

    if (
      fromAccount.availableBalance <
      transfer.amount
    ) {
      throw new Error(
        "Insufficient available funds."
      );
    }

    const senderBefore =
      fromAccount.currentBalance;

    const receiverBefore =
      toAccount.currentBalance;

    fromAccount.currentBalance -=
      transfer.amount;

    fromAccount.availableBalance -=
      transfer.amount;

    toAccount.currentBalance +=
      transfer.amount;

    toAccount.availableBalance +=
      transfer.amount;

    await fromAccount.save({
      session,
    });

    await toAccount.save({
      session,
    });

    const executionReference =
      generateReference("TRF");

    await createTransaction({
      user: transfer.user.toString(),

      account:
        fromAccount._id.toString(),

      reference: executionReference,

      type: "TRANSFER",

      direction: "DEBIT",

      amount: transfer.amount,

      balanceBefore: senderBefore,

      balanceAfter:
        fromAccount.currentBalance,

      description:
        transfer.description ||
        `Scheduled transfer to ${toAccount.nickname}`,

      counterpartyAccount:
        toAccount.accountNumber,

      counterpartyName:
        `${toAccount.nickname} (${toAccount.type})`,

      memo: transfer.description,

      session,
    });

    await createTransaction({
      user: transfer.user.toString(),

      account:
        toAccount._id.toString(),

      reference: executionReference,

      type: "TRANSFER",

      direction: "CREDIT",

      amount: transfer.amount,

      balanceBefore: receiverBefore,

      balanceAfter:
        toAccount.currentBalance,

      description:
        transfer.description ||
        `Scheduled transfer from ${fromAccount.nickname}`,

      counterpartyAccount:
        fromAccount.accountNumber,

      counterpartyName:
        `${fromAccount.nickname} (${fromAccount.type})`,

      memo: transfer.description,

      session,
    });

    const executionDate = new Date();

    if (transfer.isRecurring) {
      const nextRunAt =
        getNextRunDate(
          transfer.nextRunAt ??
            transfer.scheduledDate,
          transfer.recurringFrequency as RecurringFrequency
        );

      if (!nextRunAt) {
        throw new Error(
          "Recurring transfer has no valid frequency."
        );
      }

      transfer.status = "SCHEDULED";
      transfer.lastRunAt =
        executionDate;
      transfer.nextRunAt =
        nextRunAt;
      transfer.failureReason = null;

      await transfer.save({
        session,
      });
    } else {
      transfer.status = "COMPLETED";
      transfer.lastRunAt =
        executionDate;
      transfer.nextRunAt = null;
      transfer.completedAt =
        executionDate;
      transfer.failureReason = null;

      await transfer.save({
        session,
      });
    }

    await session.commitTransaction();

    return {
      success: true as const,
      reference: executionReference,
      recurring: transfer.isRecurring,
      nextRunAt: transfer.nextRunAt,
    };
  } catch (error) {
    await session.abortTransaction();

    /*
     * Marking FAILED should not happen inside the
     * aborted transaction, because the status change
     * itself would be rolled back.
     */
    const message =
      error instanceof Error
        ? error.message
        : "Scheduled transfer failed.";

    await ScheduledTransfer.findByIdAndUpdate(
      transferId,
      {
        $set: {
          status: "FAILED",
          failureReason: message,
        },
      }
    );

    throw error;
  } finally {
    await session.endSession();
  }
}