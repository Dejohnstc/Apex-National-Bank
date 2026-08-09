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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const account = await Account.findOne({
      _id: parsed.account,
      user: userId,
    }).session(session);

    if (!account) {
      throw new Error("Account not found.");
    }

    const total = parsed.amount;

    if (
      !parsed.scheduledDate &&
      account.availableBalance < total
    ) {
      throw new Error("Insufficient funds.");
    }

    const reference = generateReference("BP");

    const [payment] = await BillPayment.create(
      [
        {
          user: userId,
          account: account._id,
          biller: parsed.biller,
          category: parsed.category,
          accountNumber: parsed.accountNumber,
          amount: parsed.amount,
          fee: 0,
          memo: parsed.memo,
          scheduledDate: parsed.scheduledDate,
          paymentDate: parsed.scheduledDate
            ? undefined
            : new Date(),
          status: parsed.scheduledDate
            ? "SCHEDULED"
            : "COMPLETED",
          isRecurring: parsed.isRecurring,
          recurringFrequency:
            parsed.recurringFrequency,
          reference,
          confirmationNumber:
            crypto.randomUUID(),
        },
      ],
      { session }
    );

    if (!parsed.scheduledDate) {
      const balanceBefore =
        account.availableBalance;

      account.availableBalance -= total;

      await account.save({ session });

      await Transaction.create(
        [
          {
            user: userId,
            account: account._id,
            type: "BILL_PAYMENT",
            direction: "OUT",
            status: "COMPLETED",
            amount: parsed.amount,
            fee: 0,
            balanceBefore,
            balanceAfter:
              account.availableBalance,
            description: `Bill Payment - ${parsed.biller}`,
            merchant: parsed.biller,
            category: parsed.category,
            currency: account.currency,
            reference,
            postedAt: new Date(),
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();

    return {
      success: true,
      payment,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
}