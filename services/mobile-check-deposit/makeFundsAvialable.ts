import mongoose from "mongoose";

import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";
import CheckDeposit from "@/models/CheckDeposit";

import { generateReference } from "@/lib/bank/generateReference";
import { createTransaction } from "@/services/transaction/createTransaction";
import { createNotification } from "@/services/notification/createNotification";

interface MakeFundsAvailableInput {
  userId: string;
  depositId: string;
}

export async function makeFundsAvailable({
  userId,
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

    /*
     * Lock the deposit to this customer and
     * require APPROVED status.
     */
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

    /*
     * Verify the destination account belongs
     * to the same customer and is active.
     */
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

    const balanceBefore =
      account.availableBalance;

    const balanceAfter =
      balanceBefore + deposit.amount;

    /*
     * Credit the account.
     */
    account.currentBalance +=
      deposit.amount;

    account.availableBalance +=
      deposit.amount;

    await account.save({
      session,
    });

    /*
     * Create the financial transaction
     * inside the same MongoDB transaction.
     */
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

      postedAt: new Date(),

      availableBalance:
        account.availableBalance,

      session,
    });

    /*
     * Only mark the deposit available after
     * the account credit and transaction have
     * been created successfully.
     */
    deposit.status =
      "FUNDS_AVAILABLE";

    deposit.availableAt =
      new Date();

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
   * Notify only after the financial transaction
   * has successfully committed.
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