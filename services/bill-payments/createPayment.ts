import crypto from "crypto";
import mongoose from "mongoose";

import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";
import BillPayment from "@/models/BillPayment";
import { Transaction } from "@/models/transaction/Transaction";

import {
  paymentSchema,
  type PaymentData,
} from "@/validators/bill-payments/paymentSchema";

import { generateReference } from "@/lib/bank/generateReference";

import { createNotification } from "@/services/notification/createNotification";

interface CreatePaymentInput {
  userId: string;
  data: unknown;
}

export async function createPayment({
  userId,
  data,
}: CreatePaymentInput) {
  await dbConnect();

  const parsed: PaymentData =
    paymentSchema.parse(data);

  const session =
    await mongoose.startSession();

  let reference = "";
  let paymentId = "";
  let isScheduled = false;

  /*
   * Keep the payment document outside
   * the transaction block so it can be
   * serialized after the transaction commits.
   */
  let payment:
    | Awaited<
        ReturnType<
          typeof BillPayment.create
        >
      >[number]
    | null = null;

  try {
    session.startTransaction();

    /*
     * Verify that the account belongs
     * to the authenticated user.
     */
    const account =
      await Account.findOne({
        _id: parsed.account,
        user: userId,
        status: "ACTIVE",
      }).session(session);

    if (!account) {
      throw new Error(
        "Account not found."
      );
    }

    const total = parsed.amount;

    /*
     * Scheduled payments do not debit
     * the account immediately.
     */
    isScheduled =
      Boolean(parsed.scheduledDate);

    reference =
      generateReference("BP");

    /*
     * Create the bill payment record.
     */
    const payments =
      await BillPayment.create(
        [
          {
            user: userId,
            account: account._id,

            biller: parsed.biller,
            category: parsed.category,
            accountNumber:
              parsed.accountNumber,

            amount: parsed.amount,
            fee: 0,

            memo: parsed.memo,

            scheduledDate:
              parsed.scheduledDate,

            paymentDate: isScheduled
              ? undefined
              : new Date(),

            status: isScheduled
              ? "SCHEDULED"
              : "COMPLETED",

            isRecurring:
              parsed.isRecurring,

            recurringFrequency:
              parsed.recurringFrequency,

            reference,

            confirmationNumber:
              crypto.randomUUID(),
          },
        ],
        { session }
      );

    payment = payments[0];

    if (!payment) {
      throw new Error(
        "Unable to create bill payment."
      );
    }

    paymentId =
      payment._id.toString();

    /*
     * Immediate payment:
     *
     * Debit the account and create
     * the corresponding transaction.
     */
    if (!isScheduled) {
      const balanceBefore =
        account.availableBalance;

      /*
       * Make the balance check and debit
       * part of the same database operation.
       */
      const updatedAccount =
        await Account.findOneAndUpdate(
          {
            _id: account._id,
            user: userId,
            status: "ACTIVE",
            availableBalance: {
              $gte: total,
            },
          },
          {
            $inc: {
              availableBalance: -total,
            },
          },
          {
            new: true,
            session,
          }
        );

      if (!updatedAccount) {
        throw new Error(
          "Insufficient funds."
        );
      }

      await Transaction.create(
        [
          {
            user: userId,
            account: account._id,

            type: "BILL_PAYMENT",
            direction: "DEBIT",
            status: "COMPLETED",

            amount: parsed.amount,
            fee: 0,

            balanceBefore,
            balanceAfter:
              updatedAccount.availableBalance,

            description:
              `Bill Payment - ${parsed.biller}`,

            merchant:
              parsed.biller,

            category:
              parsed.category,

            currency:
              account.currency,

            reference,

            postedAt: new Date(),
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  /*
   * The database transaction has successfully
   * committed.
   *
   * Notifications are deliberately created
   * afterward so notification/email failures
   * cannot roll back the payment.
   */
  try {
    if (isScheduled) {
      await createNotification({
        user: userId,

        title:
          "Bill Payment Scheduled",

        message:
          `Your ${parsed.biller} bill payment of ${new Intl.NumberFormat(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          ).format(
            parsed.amount
          )} has been scheduled.`,

        type: "INFO",

        category: "BILLPAY",

        actionUrl:
          "/dashboard/bill-payments",

        metadata: {
          paymentId,
          reference,
          biller: parsed.biller,
          amount: parsed.amount,
          scheduledDate:
            parsed.scheduledDate,
          isRecurring:
            parsed.isRecurring,
          recurringFrequency:
            parsed.recurringFrequency,
        },
      });
    } else {
      await createNotification({
        user: userId,

        title:
          "Bill Payment Completed",

        message:
          `Your ${parsed.biller} bill payment of ${new Intl.NumberFormat(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          ).format(
            parsed.amount
          )} was completed successfully.`,

        type: "SUCCESS",

        category: "BILLPAY",

        actionUrl:
          "/dashboard/bill-payments",

        metadata: {
          paymentId,
          reference,
          biller: parsed.biller,
          amount: parsed.amount,
          category:
            parsed.category,
        },
      });
    }
  } catch (notificationError) {
    console.error(
      "Bill payment notification failed:",
      notificationError
    );
  }

  /*
   * IMPORTANT:
   *
   * Do not return the Mongoose document.
   * Server Actions can only pass plain
   * serializable values to Client Components.
   */
  if (!payment) {
    throw new Error(
      "Bill payment was created but could not be returned."
    );
  }

  return {
    success: true,

    payment: {
      _id: payment._id.toString(),

      user:
        payment.user.toString(),

      account:
        payment.account.toString(),

      biller:
        payment.biller,

      category:
        payment.category,

      accountNumber:
        payment.accountNumber,

      amount:
        payment.amount,

      fee:
        payment.fee,

      memo:
        payment.memo,

      status:
        payment.status,

      paymentDate:
        payment.paymentDate
          ? payment.paymentDate.toISOString()
          : null,

      scheduledDate:
        payment.scheduledDate
          ? payment.scheduledDate.toISOString()
          : null,

      reference:
        payment.reference,

      confirmationNumber:
        payment.confirmationNumber,

      isRecurring:
        payment.isRecurring,

      recurringFrequency:
        payment.recurringFrequency,

      createdAt:
        payment.createdAt.toISOString(),

      updatedAt:
        payment.updatedAt.toISOString(),
    },
  };
}