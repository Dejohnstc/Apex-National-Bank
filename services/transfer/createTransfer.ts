import { startSession } from "mongoose";

import { connectDB } from "@/lib/db/mongodb";

import { Account } from "@/models/account/Account";

import { generateReference } from "@/lib/bank/generateReference";

import { createTransaction } from "@/services/transaction/createTransaction";

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

  console.log("========== CREATE TRANSFER ==========");
  console.log({
    fromAccountId,
    toAccountId,
    userId,
    amount,
  });

  const session = await startSession();

  try {
    session.startTransaction();

    const from = await Account.findOne({
      _id: fromAccountId,
      user: userId,
    }).session(session);

    console.log("From Account:", from?.accountNumber);

    const to = await Account.findById(
      toAccountId
    ).session(session);

    console.log("To Account:", to?.accountNumber);

    if (!from || !to) {
      throw new Error("Account not found.");
    }

    if (from.id === to.id) {
      throw new Error(
        "Cannot transfer to the same account."
      );
    }

    if (amount <= 0) {
      throw new Error(
        "Transfer amount must be greater than zero."
      );
    }

    if (from.availableBalance < amount) {
      throw new Error(
        "Insufficient available funds."
      );
    }

    const senderBefore = from.currentBalance;
    const receiverBefore = to.currentBalance;

    from.currentBalance -= amount;
    from.availableBalance -= amount;

    to.currentBalance += amount;
    to.availableBalance += amount;

    await from.save({ session });
    console.log("Sender account updated");

    await to.save({ session });
    console.log("Receiver account updated");

    const reference = generateReference("TRF");

    console.log("Reference:", reference);

    await createTransaction({
      user: userId,
      account: from.id,

      reference,

      type: "TRANSFER",
      direction: "DEBIT",

      amount,

      balanceBefore: senderBefore,
      balanceAfter: from.currentBalance,

      description:
        description ||
        `Transfer to ${to.nickname}`,

      counterpartyAccount: to.accountNumber,

      counterpartyName:
        `${to.nickname} (${to.type})`,

      memo: description,

      session,
    });

    console.log("Debit transaction created");

    await createTransaction({
      user: userId,
      account: to.id,

      reference,

      type: "TRANSFER",
      direction: "CREDIT",

      amount,

      balanceBefore: receiverBefore,
      balanceAfter: to.currentBalance,

      description:
        description ||
        `Transfer from ${from.nickname}`,

      counterpartyAccount: from.accountNumber,

      counterpartyName:
        `${from.nickname} (${from.type})`,

      memo: description,

      session,
    });

    console.log("Credit transaction created");

    await session.commitTransaction();

    console.log("Transaction committed");
    console.log("====================================");

    return {
      success: true,
      reference,
    };
  } catch (error) {
    await session.abortTransaction();

    console.error("Transfer failed:", error);

    throw error;
  } finally {
    await session.endSession();
  }
}