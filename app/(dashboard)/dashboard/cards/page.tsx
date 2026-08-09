import { getCards } from "@/services/card/getCards";

import CardDisplay from "@/components/cards/CardDisplay";
import CardControls from "@/components/cards/CardControls";

export default async function CardsPage() {
  const cards = await getCards();

  return (
    <div className="space-y-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="grid gap-6 lg:grid-cols-2"
        >
          <CardDisplay card={card} />

          <CardControls card={card} />
        </div>
      ))}
    </div>
  );
}