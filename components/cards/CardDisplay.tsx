"use client";

import { CreditCard } from "lucide-react";

import type { CardDto } from "@/types/card";

interface CardDisplayProps {
  card: CardDto;
}

export default function CardDisplay({
  card,
}: CardDisplayProps) {
  return (
    <div
      className="relative h-60 w-full overflow-hidden rounded-3xl p-8 text-white shadow-2xl"
      style={{
        background: card.color,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm opacity-80">
            Apex National Bank
          </p>

          <h2 className="mt-1 text-xl font-bold">
            {card.type} CARD
          </h2>
        </div>

        <CreditCard className="h-10 w-10 opacity-80" />
      </div>

      <div className="mt-12 text-3xl font-semibold tracking-[0.25em]">
        •••• •••• •••• {card.last4}
      </div>

      <div className="mt-10 flex justify-between">
        <div>
          <p className="text-xs uppercase opacity-70">
            Card Holder
          </p>

          <p className="font-medium">
            {card.holderName}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase opacity-70">
            Expires
          </p>

          <p className="font-medium">
            {card.expiryMonth}/
            {card.expiryYear}
          </p>
        </div>
      </div>

      <div className="absolute right-8 top-24 rounded-full border border-white/30 px-3 py-1 text-xs">
        {card.network}
      </div>

      <div className="absolute bottom-6 right-8 rounded-full bg-white/20 px-3 py-1 text-xs">
        {card.status}
      </div>
    </div>
  );
}