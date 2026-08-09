import mongoose from "mongoose";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import AchTransfer from "@/models/ach/AchTransfer";
import { Account } from "@/models/account/Account";

import { creditAccount } from "@/services/account/creditAccount";
import { createNotification } from "@/services/notification/createNotification";
import { createTransaction } from "@/services/transaction/createTransaction";

export async function cancelAchTransfer(
  reference: string
) {
  await dbConnect();

  const authSession = await auth();

  if (!authSession?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const transfer = await AchTransfer.findOne({
      requester: authSession.user.id,
      reference,
    }).session(session);

    if (!transfer) {
      throw new Error("Transfer not found.");
    }

    if (transfer.status !== "PENDING") {
      throw new Error(
        "Only pending transfers may be cancelled."
      );
    }

    const account = await Account.findById(
      transfer.requesterAccount
    ).session(session);

    if (!account) {
      throw new Error("Account not found.");
    }

    const credit = await creditAccount(
      account._id.toString(),
      transfer.amount,
      session
    );

    transfer.status = "CANCELLED";

    await transfer.save({ session });

    await createTransaction({
      user: transfer.requester.toString(),

      account: account._id.toString(),

      reference: `${transfer.reference}-CANCEL`,

      type: "ACH",

      direction: "CREDIT",

      amount: transfer.amount,

      balanceBefore: credit.balanceBefore,

      balanceAfter: credit.balanceAfter,

      description: `ACH Cancellation • ${transfer.recipientName}`,

      status: "COMPLETED",

      counterpartyName:
        transfer.recipientName,

      counterpartyAccount: `****${transfer.accountNumber.slice(
        -4
      )}`,

      memo: "ACH transfer cancelled",

      metadata: {
        transferId: transfer.reference,
        externalReference: transfer.reference,
      },

      session,
    });

    await createNotification({
      user: transfer.requester.toString(),

      title: "ACH Transfer Cancelled",

      message:
        "Your ACH transfer has been cancelled and the funds have been returned to your account.",

      type: "INFO",

      actionUrl: `/dashboard/transfers/${transfer.reference}`,

      session,
    });

    await session.commitTransaction();

    return {
      success: true,
      transfer,
    };
  } catch (error) {
    await session.abortTransaction();

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to cancel transfer.",
    };
  } finally {
    await session.endSession();
  }
}