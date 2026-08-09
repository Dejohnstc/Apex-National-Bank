import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

export async function unfreezeCard(
  id: string
): Promise<boolean> {
  await connectDB();

  const card =
    await Card.findById(id);

  if (!card) {
    return false;
  }

  card.status = "ACTIVE";

  await card.save();

  return true;
}