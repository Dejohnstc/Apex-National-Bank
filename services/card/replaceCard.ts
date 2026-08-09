import crypto from "crypto";

import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

function randomDigits(length: number) {
  let result = "";

  while (result.length < length) {
    result += (
      crypto.randomInt(0, 10)
    ).toString();
  }

  return result;
}

export async function replaceCard(
  cardId: string
) {
  await connectDB();

  const number = randomDigits(16);

  await Card.findByIdAndUpdate(cardId, {
    cardNumber: number,
    last4: number.slice(-4),
    cvv: randomDigits(3),
    status: "ACTIVE",
  });

  return {
    success: true,
  };
}