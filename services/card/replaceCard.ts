import crypto from "crypto";

import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

function randomDigits(length: number) {
  let result = "";

  while (result.length < length) {
    result += crypto.randomInt(0, 10).toString();
  }

  return result;
}

export async function replaceCard(
  userId: string,
  cardId: string
) {
  await connectDB();

  const card = await Card.findOne({
    _id: cardId,
    userId,
  });

  if (!card) {
    return {
      success: false,
      message: "Card not found.",
    };
  }

  const number = randomDigits(16);

  card.cardNumber = number;
  card.last4 = number.slice(-4);
  card.cvv = randomDigits(3);
  card.status = "ACTIVE";

  await card.save();

  return {
    success: true,
  };
}