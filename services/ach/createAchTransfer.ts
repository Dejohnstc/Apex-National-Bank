import mongoose from "mongoose";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";
import { calculateAchEffectiveDate } from "@/lib/banking/calculateAchEffectiveDate";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";
import AchTransfer from "@/models/ach/AchTransfer";

import { checkTransferLimits } from "@/services/payments/checkTransferLimits";
import { generateReference } from "@/services/payments/generateReference";
import { createTransaction } from "@/services/transaction/createTransaction";

export interface CreateAchTransferInput {
  accountId: string;

  recipientName: string;

  recipientBank: string;

  routingNumber: string;

  accountNumber: string;

  accountType: "CHECKING" | "SAVINGS";

  amount: number;

  memo?: string;
}

export async function createAchTransfer(
  input: CreateAchTransferInput
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

    const user = await User.findById(
      authSession.user.id
    ).session(session);

    if (!user) {
      throw new Error("User not found.");
    }

    const account = await Account.findById(
      input.accountId
    ).session(session);

    if (!account) {
      throw new Error("Account not found.");
    }

    if (
      account.user.toString() !==
      user._id.toString()
    ) {
      throw new Error(
        "You are not authorized to use this account."
      );
    }

    if (input.amount <= 0) {
      throw new Error(
        "Transfer amount must be greater than zero."
      );
    }

    if (!/^\d{9}$/.test(input.routingNumber)) {
      throw new Error(
        "Routing number must contain exactly 9 digits."
      );
    }

    if (
      input.accountNumber.length < 4 ||
      input.accountNumber.length > 17
    ) {
      throw new Error(
        "Invalid account number."
      );
    }

    await checkTransferLimits({
      user: user._id.toString(),
      type: "ACH",
      amount: input.amount,
    });

    const reference =
      generateReference("ACH");

    const now = new Date();

    const effectiveDate =
      await calculateAchEffectiveDate(now);

    /**
     * Create pending transaction.
     * No funds move until admin completes the ACH.
     */
    const transaction =
      await createTransaction({
        user: user._id.toString(),

        account: account._id.toString(),

        reference,

        type: "ACH",

        direction: "DEBIT",

        amount: input.amount,

        status: "PENDING",

        balanceBefore:
          account.availableBalance,

        balanceAfter:
          account.availableBalance,

        description: `ACH Transfer to ${input.recipientBank} • ${input.recipientName}`,

        counterpartyName:
          input.recipientName,

        counterpartyAccount:
          `****${input.accountNumber.slice(-4)}`,

        memo: input.memo,

        session,
      });

    const [achTransfer] =
      await AchTransfer.create(
        [
          {
            requester: user._id,

            requesterAccount:
              account._id,

            transactionId:
              transaction._id,

            transactionReference:
              transaction.reference,

            recipientName:
              input.recipientName.trim(),

            recipientBank:
              input.recipientBank.trim(),

            routingNumber:
              input.routingNumber,

            accountNumber:
              input.accountNumber,

            accountType:
              input.accountType,

            amount:
              input.amount,

            memo:
              input.memo?.trim(),

            reference,

            direction:
              "OUTGOING",

            status:
              "PENDING",

            effectiveDate,

            recipientVerified:
              false,

            history: [
              {
                status:
                  "PENDING",

                changedBy:
                  user._id,

                actorType:
                  "CUSTOMER",

                note:
                  "ACH transfer submitted and awaiting approval.",

                createdAt:
                  now,
              },
            ],

            notifications: {
              submitted: true,
            },

            fee: {
              amount: 0,
              charged: false,
            },

            risk: {
              score: 0,
              flagged: false,
            },
          },
        ],
        {
          session,
        }
      );

    await session.commitTransaction();

    return {
      success: true,

      achId:
        achTransfer._id.toString(),

      reference,
    };
  } catch (error) {
    await session.abortTransaction();

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Transfer failed.",
    };
  } finally {
    await session.endSession();
  }
}