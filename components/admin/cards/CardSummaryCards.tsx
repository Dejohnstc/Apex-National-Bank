import {
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type { CardSummary } from "@/services/admin/cards";

interface Props {
  summary: CardSummary;
}

export function CardSummaryCards({
  summary,
}: Props) {
  const cards = [
    {
      title: "Total Cards",
      value: summary.totalCards,
      icon: CreditCard,
    },
    {
      title: "Active",
      value: summary.activeCards,
      icon: ShieldCheck,
    },
    {
      title: "Frozen",
      value: summary.frozenCards,
      icon: Lock,
    },
    {
      title: "Virtual",
      value: summary.virtualCards,
      icon: Smartphone,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardContent className="flex items-center justify-between py-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {item.value.toLocaleString()}
                </h2>
              </div>

              <Icon className="h-8 w-8 text-muted-foreground" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}