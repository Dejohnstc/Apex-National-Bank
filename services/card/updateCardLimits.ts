import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

export async function updateCardLimits(
  cardId: string,
  limit: number
) {
  await connectDB();

  await Card.findByIdAndUpdate(cardId, {
    dailyLimit: limit,
  });

  return {
    success: true,
  };
}