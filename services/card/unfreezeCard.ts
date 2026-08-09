import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

export async function unfreezeCard(
  cardId: string
) {
  await connectDB();

  await Card.findByIdAndUpdate(cardId, {
    status: "ACTIVE",
  });

  return {
    success: true,
  };
}