import type { SortOrder } from "mongoose";

import connectDB from "@/lib/db/connect";

import Card from "@/models/Card";

import type {
  AdminCard,
  CardSummary,
  GetCardsParams,
  GetCardsResponse,
} from "./types";

type LeanCard = {
  _id: {
    toString(): string;
  };

  holderName: string;

  cardNumber: string;

  last4: string;

  expiryMonth: number;

  expiryYear: number;

  network: AdminCard["network"];

  type: AdminCard["type"];

  status: AdminCard["status"];

  dailyLimit: number;

  atmEnabled: boolean;

  onlineEnabled: boolean;

  contactlessEnabled: boolean;

  internationalEnabled: boolean;

  virtual: boolean;

  color: string;

  createdAt: Date;

  updatedAt: Date;
};

export async function getCards(
  params: GetCardsParams = {}
): Promise<GetCardsResponse> {
  await connectDB();

  const page = params.page ?? 1;
  const limit = 10;

  const query: Record<string, unknown> = {};

  if (params.search) {
    query.$or = [
      {
        holderName: {
          $regex: params.search,
          $options: "i",
        },
      },
      {
        last4: {
          $regex: params.search,
          $options: "i",
        },
      },
    ];
  }

  if (params.status) {
    query.status = params.status;
  }

  if (params.type) {
    query.type = params.type;
  }

  if (params.network) {
    query.network = params.network;
  }

  if (
    typeof params.virtual ===
    "boolean"
  ) {
    query.virtual = params.virtual;
  }

  const sort: Record<
    string,
    SortOrder
  > = {
    createdAt:
      params.sort === "oldest"
        ? 1
        : -1,
  };

  const [rawCards, total] =
    await Promise.all([
      Card.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Card.countDocuments(query),
    ]);

  const cards =
    rawCards as unknown as LeanCard[];

  const data: AdminCard[] =
    cards.map((card) => ({
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

      network: card.network,

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
    }));

  const [
    totalCards,
    activeCards,
    frozenCards,
    virtualCards,
  ] = await Promise.all([
    Card.countDocuments(),

    Card.countDocuments({
      status: "ACTIVE",
    }),

    Card.countDocuments({
      status: "FROZEN",
    }),

    Card.countDocuments({
      virtual: true,
    }),
  ]);

  const summary: CardSummary = {
    totalCards,

    activeCards,

    frozenCards,

    virtualCards,
  };

  return {
    data,

    summary,

    pagination: {
      page,

      limit,

      total,

      totalPages: Math.ceil(
        total / limit
      ),
    },
  };
}