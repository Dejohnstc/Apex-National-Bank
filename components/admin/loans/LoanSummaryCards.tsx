import {
  CreditCard,
  DollarSign,
  Clock3,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type { LoanSummary } from "@/services/admin/loans";

interface Props {
  summary: LoanSummary;
}

export function LoanSummaryCards({
  summary,
}: Props) {
  const cards = [
    {
      title: "Total Loans",
      value: summary.totalLoans,
      icon: CreditCard,
    },
    {
      title: "Active",
      value: summary.activeLoans,
      icon: DollarSign,
    },
    {
      title: "Pending",
      value: summary.pendingLoans,
      icon: Clock3,
    },
    {
      title: "Paid",
      value: summary.paidLoans,
      icon: CheckCircle2,
    },
    {
      title: "Defaulted",
      value: summary.defaultedLoans,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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