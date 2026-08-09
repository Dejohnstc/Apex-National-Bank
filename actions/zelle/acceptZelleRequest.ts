"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";
import ZelleRequest from "@/models/ZelleRequest";

import { debitAccount } from "@/services/account/debitAccount";
import { creditAccount } from "@/services/account/creditAccount";
import { createTransaction } from "@/services/transaction/createTransaction";

interface Input {
  requestId: string;
}

export async function acceptZelleRequestAction({
  requestId,
}: Input) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  await dbConnect();

  const recipient = await User.findById(session.user.id);

  if (!recipient) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  const request = await ZelleRequest.findById(requestId);

  if (!request) {
    return {
      success: false,
      message: "Request not found.",
    };
  }

  if (request.status !== "pending") {
    return {
      success: false,
      message: "This request has already been processed.",
    };
  }

  if (String(request.recipient) !== String(recipient._id)) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const recipientAccount = await Account.findOne({
    user: recipient._id,
    status: "ACTIVE",
  });

  if (!recipientAccount) {
    return {
      success: false,
      message: "Recipient account not found.",
    };
  }

  const requesterAccount = await Account.findById(
    request.requesterAccount
  );

  if (!requesterAccount) {
    return {
      success: false,
      message: "Destination account not found.",
    };
  }

  if (recipientAccount.availableBalance < request.amount) {
    return {
      success: false,
      message: "Insufficient available balance.",
    };
  }

  const mongoSession = await mongoose.startSession();

  try {
    await mongoSession.startTransaction();

    const debit = await debitAccount(
      String(recipientAccount._id),
      request.amount,
      mongoSession
    );

    const credit = await creditAccount(
      String(requesterAccount._id),
      request.amount,
      mongoSession
    );

    await createTransaction({
      account: String(recipientAccount._id),
      user: String(recipient._id),
      reference: request.reference,
      type: "TRANSFER",
      direction: "DEBIT",
      amount: request.amount,
      balanceBefore: debit.balanceBefore,
      balanceAfter: debit.balanceAfter,
      description: "Accepted Zelle Request",
      counterpartyName: request.recipientEmail,
      session: mongoSession,
    });

    await createTransaction({
      account: String(requesterAccount._id),
      user: String(request.requester),
      reference: request.reference,
      type: "TRANSFER",
      direction: "CREDIT",
      amount: request.amount,
      balanceBefore: credit.balanceBefore,
      balanceAfter: credit.balanceAfter,
      description: "Zelle Request Paid",
      counterpartyName: recipient.email,
      session: mongoSession,
    });

    request.status = "accepted";
    request.recipientAccount = recipientAccount._id;

    await request.save({
      session: mongoSession,
    });

    await mongoSession.commitTransaction();

    revalidatePath("/dashboard/zelle");
    revalidatePath("/dashboard/zelle/requests");

    return {
      success: true,
      message: "Payment completed.",
    };
  } catch (error) {
    await mongoSession.abortTransaction();

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to complete payment.",
    };
  } finally {
    await mongoSession.endSession();
  }
}