import crypto from "crypto";
import { ClientSession } from "mongoose";

import connectDB from "@/lib/db/connect";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";
import Card from "@/models/Card";

interface CreateCardInput {
  userId: string;
  accountId: string;
  session?: ClientSession;
}

function randomDigits(length: number) {
  let value = "";

  while (value.length < length) {
    value += crypto.randomInt(0, 10).toString();
  }

  return value;
}

export async function createCard({
  userId,
  accountId,
  session,
}: CreateCardInput) {
  await connectDB();

  const account =
  await Account.findById(accountId)
    .session(session ?? null)
    .lean();

  if (!account) {
    throw new Error("Account not found.");
  }

  const user =
  await User.findById(userId)
    .session(session ?? null)
    .lean();

  if (!user) {
    throw new Error("User not found.");
  }

 const existing =
  await Card.findOne({
    accountId,
    type: "DEBIT",
  }).session(session ?? null);

  if (existing) {
    return existing;
  }

  const cardNumber = randomDigits(16);

  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 4);

  const payload = {
  userId: account.user,

  accountId: account._id,

  holderName: `${String(user.firstName)} ${String(user.lastName)}`,

  cardNumber,

  last4: cardNumber.slice(-4),

  expiryMonth: expiry.getMonth() + 1,

  expiryYear: expiry.getFullYear(),

  cvv: randomDigits(3),

  network: "VISA" as const,

  type: "DEBIT" as const,

  status: "ACTIVE" as const,

  dailyLimit: 5000,

  atmEnabled: true,

  onlineEnabled: true,

  contactlessEnabled: true,

  internationalEnabled: true,

  virtual: false,

  color: "#0f172a",
};

  if (session) {
  const cards = await Card.create(
  [payload],
  { session }
);

return cards[0];
  }

  return Card.create(payload);
}