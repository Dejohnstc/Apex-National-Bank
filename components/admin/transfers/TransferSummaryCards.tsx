import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  ArrowLeftRight,
  DollarSign,
  Clock3,
  CircleCheck,
} from "lucide-react";

interface Props {
  summary: {
    totalTransfers: number;
    totalVolume: number;
    pendingTransfers: number;
    completedTransfers: number;
  };
}

export function TransferSummaryCards({
  summary,
}: Props) {
  const cards = [
    {
      title: "Transfers",
      value:
        summary.totalTransfers.toLocaleString(),
      icon: ArrowLeftRight,
    },
    {
      title: "Volume",
      value:
        summary.totalVolume.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ),
      icon: DollarSign,
    },
    {
      title: "Pending",
      value:
        summary.pendingTransfers.toLocaleString(),
      icon: Clock3,
    },
    {
      title: "Completed",
      value:
        summary.completedTransfers.toLocaleString(),
      icon: CircleCheck,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardContent className="flex items-center justify-between py-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {card.value}
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