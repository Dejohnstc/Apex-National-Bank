import crypto from "node:crypto";
import mongoose from "mongoose";

import { provisionAccounts } from "@/services/account/provisionAccounts";
import { createCard } from "@/services/card/createCard";

import { connectDB } from "@/lib/db/mongodb";
import { hashPassword } from "@/lib/auth/password";
import { sendVerificationEmail } from "@/lib/mail/sendVerificationEmail";

import { User } from "@/models/user/User";

import {
  USER_ROLES,
  USER_STATUS,
  EMAIL_STATUS,
  PHONE_STATUS,
  ACCOUNT_TYPES,
} from "@/models/user/user.constants";

import type { RegisterFormValues } from "@/lib/validation/auth";

export async function registerUser(
  data: RegisterFormValues
) {
  await connectDB();

  const existingUser = await User.findOne({
    email: data.email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  const password = await hashPassword(
    data.password
  );

  const verificationToken =
    crypto.randomBytes(32).toString("hex");

  const verificationTokenHash = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const customerId = `APX${Date.now()}`;

  const username = data.email
    .split("@")[0]
    .toLowerCase();

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const [user] = await User.create(
      [
        {
          customerId,
          username,

          email: data.email.toLowerCase(),
          password,

          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,

          role: USER_ROLES[0],
          status: USER_STATUS[0],

          emailStatus: EMAIL_STATUS[0],
          phoneStatus: PHONE_STATUS[0],

          accountType: ACCOUNT_TYPES[0],

          verificationToken:
            verificationTokenHash,

          verificationTokenExpires:
            new Date(
              Date.now() +
                1000 * 60 * 60 * 24
            ),
        },
      ],
      { session }
    );

    const accounts =
      await provisionAccounts(
        user._id.toString(),
        session
      );

    await createCard({
      userId: user._id.toString(),
      accountId:
        accounts.checking._id.toString(),
      session,
    });

    await session.commitTransaction();

    await sendVerificationEmail({
      email: user.email,
      firstName: user.firstName,
      verificationToken,
    });

    return {
      success: true,
      email: user.email,
      firstName: user.firstName,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
}