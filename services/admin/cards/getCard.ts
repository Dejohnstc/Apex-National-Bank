import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

import type { AdminCard } from "./types";

export async function getCard(
  id: string
): Promise<AdminCard | null> {
  await connectDB();

  const card =
    await Card.findById(id).lean();

  if (!card) {
    return null;
  }

  return {
    id: card._id.toString(),

    holderName:
      card.holderName,

    cardNumber:
      card.cardNumber,

    last4: card.last4,

    expiryMonth:
      card.expiryMonth,

    expiryYear:
      card.expiryYear,

    network:
      card.network,

    type: card.type,

    status: card.status,

    dailyLimit:
      card.dailyLimit,

    atmEnabled:
      card.atmEnabled,

    onlineEnabled:
      card.onlineEnabled,

    contactlessEnabled:
      card.contactlessEnabled,

    internationalEnabled:
      card.internationalEnabled,

    virtual:
      card.virtual,

    color: card.color,

    createdAt:
      card.createdAt,

    updatedAt:
      card.updatedAt,
  };
}