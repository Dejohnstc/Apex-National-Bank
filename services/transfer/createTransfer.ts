import { startSession } from "mongoose";

import { connectDB } from "@/lib/db/mongodb";

import { Account } from "@/models/account/Account";

import { generateReference } from "@/lib/bank/generateReference";

import { createTransaction } from "@/services/transaction/createTransaction";

import { createNotification } from "@/services/notification/createNotification";

interface CreateTransferInput {
  fromAccountId: string;
  toAccountId: string;
  userId: string;
  amount: number;
  description: string;
}

export async function createTransfer({
  fromAccountId,
  toAccountId,
  userId,
  amount,
  description,
}: CreateTransferInput) {
  await connectDB();

  const session = await startSession();

  let reference = "";
  let transferAmount = amount;
  let recipientName = "";
  let senderAccountName = "";

  try {
    session.startTransaction();

    const from = await Account.findOne({
      _id: fromAccountId,
      user: userId,
      status: "ACTIVE",
    }).session(session);

    if (!from) {
      throw new Error(
        "Source account not found."
      );
    }

    const to = await Account.findOne({
      _id: toAccountId,
      user: userId,
      status: "ACTIVE",
    }).session(session);

    if (!to) {
      throw new Error(
        "Destination account not found."
      );
    }

    if (from.id === to.id) {
      throw new Error(
        "Cannot transfer to the same account."
      );
    }

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      throw new Error(
        "Transfer amount must be greater than zero."
      );
    }

    if (
      from.availableBalance < amount
    ) {
      throw new Error(
        "Insufficient available funds."
      );
    }

    const senderBefore =
      from.availableBalance;

    const receiverBefore =
      to.availableBalance;

    from.currentBalance -= amount;
    from.availableBalance -= amount;

    to.currentBalance += amount;
    to.availableBalance += amount;

    await from.save({ session });
    await to.save({ session });

    reference =
      generateReference("TRF");

    recipientName =
      `${to.nickname} (${to.type})`;

    senderAccountName =
      `${from.nickname} (${from.type})`;

    transferAmount = amount;

    await createTransaction({
      user: userId,
      account: from.id,
      reference,

      type: "TRANSFER",
      direction: "DEBIT",
      status: "COMPLETED",

      amount,

      balanceBefore: senderBefore,
      balanceAfter:
        from.availableBalance,

      description:
        description ||
        `Transfer to ${to.nickname}`,

      counterpartyAccount:
        to.accountNumber,

      counterpartyName:
        recipientName,

      memo: description,

      session,
    });

    await createTransaction({
      user: userId,
      account: to.id,
      reference,

      type: "TRANSFER",
      direction: "CREDIT",
      status: "COMPLETED",

      amount,

      balanceBefore: receiverBefore,
      balanceAfter:
        to.availableBalance,

      description:
        description ||
        `Transfer from ${from.nickname}`,

      counterpartyAccount:
        from.accountNumber,

      counterpartyName:
        senderAccountName,

      memo: description,

      session,
    });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();

    console.error(
      "Transfer failed:",
      error
    );

    throw error;
  } finally {
    await session.endSession();
  }

  /*
   * The transfer has now successfully committed.
   * Notification failure must never undo the transfer.
   */
  try {
    await createNotification({
      user: userId,

      title: "Transfer Completed",

      message:
        `Your transfer of ${new Intl.NumberFormat(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ).format(transferAmount)} to ${recipientName} was completed successfully.`,

      type: "SUCCESS",

      category: "ACH",

      actionUrl:
        `/dashboard/transactions`,

      metadata: {
        reference,
        amount: transferAmount,
        recipient: recipientName,
      },
    });
  } catch (notificationError) {
    console.error(
      "Transfer notification failed:",
      notificationError
    );
  }

  return {
    success: true,
    reference,
  };
}