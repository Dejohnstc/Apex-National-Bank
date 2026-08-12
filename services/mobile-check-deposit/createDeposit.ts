import mongoose from "mongoose";

import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";
import CheckDeposit from "@/models/CheckDeposit";

import {
  depositSchema,
  type DepositData,
} from "@/validators/mobile-check-deposit/depositSchema";

import { generateReference } from "@/lib/bank/generateReference";

import { createNotification } from "@/services/notification/createNotification";

interface CreateDepositInput {
  userId: string;
  data: unknown;
}

export async function createDeposit({
  userId,
  data,
}: CreateDepositInput) {
  await dbConnect();

  const parsed: DepositData =
    depositSchema.parse(data);

  const session =
    await mongoose.startSession();

  let reference = "";
  let depositId = "";

  try {
    session.startTransaction();

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

    /*
     * Initial mobile check deposit limit.
     */
    if (parsed.amount > 10000) {
      throw new Error(
        "Maximum mobile check deposit is $10,000."
      );
    }

    reference =
      generateReference("MCD");

    const [deposit] =
      await CheckDeposit.create(
        [
          {
            user: userId,

            account: account._id,

            amount: parsed.amount,

            frontImage:
              parsed.frontImage,

            backImage:
              parsed.backImage,

            reference,

            status: "SUBMITTED",

            submittedAt: new Date(),
          },
        ],
        {
          session,
        }
      );

    depositId =
      deposit._id.toString();

    await session.commitTransaction();

    /*
     * The deposit is now safely recorded.
     *
     * Do not allow notification/email failure
     * to affect the submitted deposit.
     */
    try {
      await createNotification({
        user: userId,

        title:
          "Check Deposit Submitted",

        message:
          `Your mobile check deposit of ${new Intl.NumberFormat(
            "en-US",
            {
              style: "currency",
              currency: account.currency,
            }
          ).format(parsed.amount)} has been submitted and is pending review.`,

        type: "INFO",

        category: "ACCOUNT",

        actionUrl:
          "/mobile-check-deposit",

        metadata: {
          depositId,
          reference,
          amount: parsed.amount,
          status: "SUBMITTED",
        },
      });
    } catch (notificationError) {
      console.error(
        "Check deposit notification failed:",
        notificationError
      );
    }

    return {
      success: true,
      deposit,
    };
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    await session.endSession();
  }
}