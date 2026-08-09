import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

type Control =
  | "atmEnabled"
  | "onlineEnabled"
  | "internationalEnabled"
  | "contactlessEnabled";

export async function toggleCardControl(
  cardId: string,
  control: Control,
  enabled: boolean
) {
  await connectDB();

  await Card.findByIdAndUpdate(cardId, {
    [control]: enabled,
  });

  return {
    success: true,
  };
}