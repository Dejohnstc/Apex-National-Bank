import mongoose from "mongoose";

import connectDB from "@/lib/db/connect";

import { Account } from "@/models/account/Account";
import { Transaction } from "@/models/transaction/Transaction";

import { generateReference } from "@/utils/generateReference";

interface InternalTransferInput {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
}

export async function internalTransfer(
  data: InternalTransferInput
) {
  await connectDB();

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const sender = await Account.findById(
      data.fromAccountId
    ).session(session);

    const receiver = await Account.findById(
      data.toAccountId
    ).session(session);

    if (!sender || !receiver) {
      throw new Error("Account not found.");
    }

    if (sender.status !== "ACTIVE") {
      throw new Error("Sender account is not active.");
    }

    if (receiver.status !== "ACTIVE") {
      throw new Error("Recipient account is not active.");
    }

    if (sender.availableBalance < data.amount) {
      throw new Error("Insufficient funds.");
    }

    const senderBefore = sender.availableBalance;
    const receiverBefore = receiver.availableBalance;

    sender.availableBalance -= data.amount;
    sender.currentBalance -= data.amount;

    receiver.availableBalance += data.amount;
    receiver.currentBalance += data.amount;

    await sender.save({ session });
    await receiver.save({ session });

    const reference = generateReference();

    await Transaction.create(
      [
        {
          user: sender.user,
          account: sender._id,

          reference,

          type: "TRANSFER",

          direction: "DEBIT",

          status: "COMPLETED",

          amount: data.amount,

          balanceBefore: senderBefore,

          balanceAfter: sender.availableBalance,

          description:
            data.description ??
            "Internal Transfer",
        },

        {
          user: receiver.user,

          account: receiver._id,

          reference,

          type: "TRANSFER",

          direction: "CREDIT",

          status: "COMPLETED",

          amount: data.amount,

          balanceBefore: receiverBefore,

          balanceAfter: receiver.availableBalance,

          description:
            data.description ??
            "Internal Transfer",
        },
      ],
      { session }
    );

    await session.commitTransaction();

    session.endSession();

    return {
      success: true,
      reference,
    };
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    throw error;
  }
}