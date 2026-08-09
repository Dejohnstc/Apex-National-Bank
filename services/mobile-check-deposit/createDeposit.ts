import mongoose from "mongoose";

import dbConnect from "@/lib/db/connect";

import { Account } from "@/models/account/Account";
import CheckDeposit from "@/models/CheckDeposit";

import {
  depositSchema,
  type DepositData,
} from "@/validators/mobile-check-deposit/depositSchema";

import { generateReference } from "@/lib/bank/generateReference";

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

  try {
    session.startTransaction();

    const account =
      await Account.findOne({
        _id: parsed.account,
        user: userId,
      }).session(session);

    if (!account) {
      throw new Error(
        "Account not found."
      );
    }

    // Initial deposit limits
    if (parsed.amount > 10000) {
      throw new Error(
        "Maximum mobile check deposit is $10,000."
      );
    }

    const reference =
      generateReference("MCD");

    const [deposit] =
      await CheckDeposit.create(
        [
          {
            user: userId,
            account: account._id,

            amount:
              parsed.amount,

            frontImage:
              parsed.frontImage,

            backImage:
              parsed.backImage,

            reference,

            status:
              "SUBMITTED",

            submittedAt:
              new Date(),
          },
        ],
        {
          session,
        }
      );

    await session.commitTransaction();

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