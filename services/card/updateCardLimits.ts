import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

export async function updateCardLimits(
  userId: string,
  cardId: string,
  limit: number
) {
  await connectDB();

  if (!Number.isFinite(limit) || limit <= 0) {
    return {
      success: false,
      message: "Enter a valid daily spending limit.",
    };
  }

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

  card.dailyLimit = limit;

  await card.save();

  return {
    success: true,
  };
}