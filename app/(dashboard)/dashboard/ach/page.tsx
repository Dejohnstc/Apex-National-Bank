import Link from "next/link";
import { ArrowRight, History, Landmark, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cards = [
  {
    title: "Send ACH Transfer",
    description:
      "Transfer funds to another bank account using the ACH network.",
    href: "/dashboard/ach/send",
    icon: Landmark,
  },
  {
    title: "ACH History",
    description:
      "Review pending, completed, and returned ACH transfers.",
    href: "/dashboard/ach/history",
    icon: History,
  },
  {
    title: "Saved External Accounts",
    description:
      "Manage external bank accounts for faster transfers.",
    href: "/dashboard/ach/external-accounts",
    icon: ShieldCheck,
  },
  {
    title: "Transfer Limits",
    description:
      "View your ACH sending limits and processing information.",
    href: "/dashboard/ach/limits",
    icon: ArrowRight,
  },
];

export default function AchDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          ACH Transfers
        </h1>

        <p className="text-muted-foreground mt-2">
          Send money securely between financial institutions,
          review transfer activity, and manage your ACH settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <Card
  key={item.title}
  className="transition-shadow hover:shadow-lg"
>
              <CardHeader className="flex flex-row items-center gap-4">
                <Icon className="h-8 w-8 text-primary" />

                <div>
                  <CardTitle>{item.title}</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>

     <Link href={item.href}>
  <Button className="w-full">
    Open
    <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
</Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            ACH Processing Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Standard ACH transfers typically complete within 1–3 business days.</p>
          <p>• Transfers submitted outside banking hours begin processing on the next business day.</p>
          <p>• Pending transfers may be cancelled before processing begins.</p>
          <p>• Weekends and federal holidays are not processing days.</p>
        </CardContent>
      </Card>
    </div>
  );
}