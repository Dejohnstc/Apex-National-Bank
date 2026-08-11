import connectDB from "@/lib/db/connect";
import Card from "@/models/Card";

export async function freezeCard(
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

  if (card.status === "FROZEN") {
    return {
      success: false,
      message: "Card is already frozen.",
    };
  }

  card.status = "FROZEN";

  await card.save();

  return {
    success: true,
  };
}