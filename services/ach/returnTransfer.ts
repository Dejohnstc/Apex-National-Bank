import mongoose from "mongoose";

import dbConnect from "@/lib/db/connect";
import { auth } from "@/lib/auth/auth";

import AchTransfer from "@/models/ach/AchTransfer";
import { createNotification } from "@/services/notification/createNotification";
import { creditAccount } from "@/services/account/creditAccount";
import { createTransaction } from "@/services/transaction/createTransaction";
import { updateTransactionStatus } from "@/services/transaction/updateTransactionStatus";

import { updateAchStatus } from "./updateAchStatus";

export async function returnTransfer(
  reference: string,
  reason: string
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
      reference,
    }).session(session);

    if (!transfer) {
      throw new Error("ACH transfer not found.");
    }

    if (transfer.status !== "PROCESSING") {
      throw new Error(
        "Only processing ACH transfers can be returned."
      );
    }

    const refund = await creditAccount(
      transfer.requesterAccount.toString(),
      transfer.amount,
      session
    );

    const updatedTransfer =
      await updateAchStatus({
        reference,

        newStatus: "RETURNED",

        changedBy: authSession.user.id,

        actorType: "ADMIN",

        note: reason,

        session,
      });

    await updateTransactionStatus({
      reference,

      status: "RETURNED",

      session,
    });

    await createTransaction({
      user: transfer.requester.toString(),

      account:
        transfer.requesterAccount.toString(),

      reference: `${reference}-RETURN`,

      type: "ACH",

      direction: "CREDIT",

      amount: transfer.amount,

      balanceBefore:
        refund.balanceBefore,

      balanceAfter:
        refund.balanceAfter,

      description:
        "ACH return refund",

      status: "COMPLETED",

      counterpartyName:
        transfer.recipientName,

      counterpartyAccount: `****${transfer.accountNumber.slice(
        -4
      )}`,

      memo: reason,

      session,
    });

    await createNotification({
      user: transfer.requester.toString(),

      title: "ACH Transfer Returned",

      message: reason,

      type: "WARNING",

      actionUrl: `/dashboard/transfers/${transfer.reference}`,

      session,
    });

    await session.commitTransaction();

    return {
      success: true,
      transfer: updatedTransfer,
    };
  } catch (error) {
    await session.abortTransaction();

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to return ACH transfer.",
    };
  } finally {
    await session.endSession();
  }
}