import { connectDB } from "@/lib/db/mongodb";

import { Account } from "@/models/account/Account";
import ScheduledTransfer from "@/models/transfer/ScheduledTransfer";

import { generateReference } from "@/lib/bank/generateReference";

import {
  scheduledTransferSchema,
  type ScheduledTransferInput,
} from "@/validators/transfers/scheduledTransferSchema";

interface CreateScheduledTransferInput {
  userId: string;
  data: ScheduledTransferInput;
}

export async function createScheduledTransfer({
  userId,
  data,
}: CreateScheduledTransferInput) {
  await connectDB();

  const parsed =
    scheduledTransferSchema.parse(data);

  // Verify source account ownership.
  const fromAccount =
    await Account.findOne({
      _id: parsed.fromAccountId,
      user: userId,
      status: "ACTIVE",
    });

  if (!fromAccount) {
    throw new Error(
      "Source account not found."
    );
  }

  // Verify destination account ownership.
  const toAccount =
    await Account.findOne({
      _id: parsed.toAccountId,
      user: userId,
      status: "ACTIVE",
    });

  if (!toAccount) {
    throw new Error(
      "Destination account not found."
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
    parsed.amount <= 0 ||
    !Number.isFinite(parsed.amount)
  ) {
    throw new Error(
      "Transfer amount must be greater than zero."
    );
  }

  if (
    parsed.scheduledDate.getTime() <=
    Date.now()
  ) {
    throw new Error(
      "Scheduled date must be in the future."
    );
  }

  // A recurring transfer must have a frequency.
  if (
    parsed.isRecurring &&
    parsed.recurringFrequency === "NONE"
  ) {
    throw new Error(
      "Select a recurring frequency."
    );
  }

  // A one-time transfer should not have a
  // recurring frequency.
  if (
    !parsed.isRecurring &&
    parsed.recurringFrequency !== "NONE"
  ) {
    throw new Error(
      "Recurring frequency is only available for recurring transfers."
    );
  }

  const reference =
    generateReference("STF");

  const scheduledTransfer =
    await ScheduledTransfer.create({
      user: userId,

      fromAccount:
        fromAccount._id,

      toAccount:
        toAccount._id,

      amount: parsed.amount,

      description:
        parsed.description,

      reference,

      scheduledDate:
        parsed.scheduledDate,

      isRecurring:
        parsed.isRecurring,

      recurringFrequency:
        parsed.recurringFrequency,

      nextRunAt:
        parsed.scheduledDate,

      status: "SCHEDULED",
    });

  return {
    success: true as const,

    id: scheduledTransfer._id.toString(),

    reference,

    scheduledDate:
      scheduledTransfer.scheduledDate,

    nextRunAt:
      scheduledTransfer.nextRunAt,
  };
}