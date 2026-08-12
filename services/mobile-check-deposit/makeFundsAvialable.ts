import mongoose from "mongoose";

import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";
import CheckDeposit from "@/models/CheckDeposit";

import { generateReference } from "@/lib/bank/generateReference";
import { createTransaction } from "@/services/transaction/createTransaction";
import { createNotification } from "@/services/notification/createNotification";

interface MakeFundsAvailableInput {
  userId: string;
  reviewerId: string;
  depositId: string;
}

export async function makeFundsAvailable({
  userId,
  reviewerId,
  depositId,
}: MakeFundsAvailableInput) {
  await dbConnect();

  const session =
    await mongoose.startSession();

  let depositReference = "";
  let amount = 0;
  let accountCurrency = "USD";

  try {
    session.startTransaction();

    const deposit =
      await CheckDeposit.findOne({
        _id: depositId,
        user: userId,
        status: "APPROVED",
      }).session(session);

    if (!deposit) {
      throw new Error(
        "Approved check deposit not found."
      );
    }

    const account =
      await Account.findOne({
        _id: deposit.account,
        user: userId,
        status: "ACTIVE",
      }).session(session);

    if (!account) {
      throw new Error(
        "Deposit account not found."
      );
    }

    const now = new Date();

    const balanceBefore =
      account.availableBalance;

    const balanceAfter =
      balanceBefore + deposit.amount;

    account.currentBalance +=
      deposit.amount;

    account.availableBalance +=
      deposit.amount;

    await account.save({
      session,
    });

    const transactionReference =
      generateReference("MCD");

    await createTransaction({
      user: userId,

      account:
        account._id.toString(),

      reference:
        transactionReference,

      type: "CHECK_DEPOSIT",

      direction: "CREDIT",

      status: "COMPLETED",

      amount: deposit.amount,

      balanceBefore,

      balanceAfter,

      description:
        "Mobile Check Deposit",

      category:
        "CHECK_DEPOSIT",

      currency:
        account.currency,

      memo:
        `Check deposit ${deposit.reference}`,

      metadata: {
        depositId:
          deposit._id.toString(),

        depositReference:
          deposit.reference,
      },

      postedAt: now,

      availableBalance:
        account.availableBalance,

      session,
    });

    deposit.status =
      "FUNDS_AVAILABLE";

    deposit.availableAt = now;

    deposit.fundsReleasedBy =
      reviewerId;

    deposit.fundsReleasedAt = now;

    await deposit.save({
      session,
    });

    depositReference =
      deposit.reference;

    amount =
      deposit.amount;

    accountCurrency =
      account.currency;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  /*
   * Notification happens only after
   * the financial transaction commits.
   */
  try {
    const formattedAmount =
      new Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency: accountCurrency,
        }
      ).format(amount);

    await createNotification({
      user: userId,

      title:
        "Check Deposit Funds Available",

      message:
        `Your mobile check deposit of ${formattedAmount} is now available in your account.`,

      type: "SUCCESS",

      category: "ACCOUNT",

      actionUrl:
        "/dashboard/mobile-check-deposit",

      metadata: {
        depositReference,
        amount,
        status:
          "FUNDS_AVAILABLE",
      },
    });
  } catch (notificationError) {
    console.error(
      "Check deposit notification failed:",
      notificationError
    );
  }

  return {
    success: true as const,
    reference: depositReference,
    amount,
  };
}