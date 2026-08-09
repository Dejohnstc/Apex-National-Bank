import { auth } from "@/lib/auth/auth";
import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

import type { CardDto } from "@/types/card";

export async function getCards(): Promise<CardDto[]> {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  await connectDB();

  const cards = await Card.find({
    userId: session.user.id,
  })
    .sort({
      createdAt: -1,
    })
    .lean();

  return cards.map((card) => ({
    id: card._id.toString(),
    holderName: card.holderName,
    last4: card.last4,
    expiryMonth: card.expiryMonth,
    expiryYear: card.expiryYear,
    network: card.network,
    type: card.type,
    status: card.status,
    dailyLimit: card.dailyLimit,
    atmEnabled: card.atmEnabled,
    onlineEnabled: card.onlineEnabled,
    internationalEnabled:
      card.internationalEnabled,
    contactlessEnabled:
      card.contactlessEnabled,
    virtual: card.virtual,
    color: card.color,
  }));
}