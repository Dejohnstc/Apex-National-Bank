import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

export async function freezeCard(
  cardId: string
) {
  await connectDB();

  await Card.findByIdAndUpdate(cardId, {
    status: "FROZEN",
  });

  return {
    success: true,
  };
}