import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

type CardControl =
  | "atmEnabled"
  | "onlineEnabled"
  | "contactlessEnabled"
  | "internationalEnabled";

export async function toggleCardControl(
  userId: string,
  cardId: string,
  control: CardControl,
  enabled: boolean
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

  card[control] = enabled;

  await card.save();

  return {
    success: true,
  };
}