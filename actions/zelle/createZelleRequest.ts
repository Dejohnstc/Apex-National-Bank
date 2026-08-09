"use server";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";
import ZelleRequest from "@/models/ZelleRequest";

interface Input {
  accountId: string;
  recipientEmail: string;
  amount: number;
  memo?: string;
}

export async function createZelleRequestAction(
  input: Input
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  await dbConnect();

  const requester = await User.findById(
    session.user.id
  );

  if (!requester) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  const account = await Account.findOne({
    _id: input.accountId,
    user: requester._id,
  });

  if (!account) {
    return {
      success: false,
      message: "Account not found.",
    };
  }

  const recipient = await User.findOne({
    email: input.recipientEmail.toLowerCase(),
  });

  if (!recipient) {
    return {
      success: false,
      message: "Recipient not found.",
    };
  }

  if (
    String(recipient._id) ===
    String(requester._id)
  ) {
    return {
      success: false,
      message:
        "You cannot request money from yourself.",
    };
  }

  const reference = `ZR-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

  await ZelleRequest.create({
    requester: requester._id,
    requesterAccount: account._id,

    recipient: recipient._id,
    recipientEmail:
      input.recipientEmail.toLowerCase(),

    amount: input.amount,
    memo: input.memo ?? "",

    reference,

    status: "pending",

    expiresAt: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ),
  });

  return {
    success: true,
    message: "Request sent successfully.",
    reference,
  };
}