import Link from "next/link";

import {
  ArrowLeftRight,
  Landmark,
  ShieldAlert,
  UserCog,
  Wallet,
  FileSearch,
  Settings,
  Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const actions = [
  {
    label: "Manage Users",
    href: "/admin/users",
    icon: UserCog,
  },
  {
    label: "Accounts",
    href: "/admin/accounts",
    icon: Landmark,
  },
  {
    label: "Transfers",
    href: "/admin/transfers",
    icon: ArrowLeftRight,
  },
  {
    label: "Transactions",
    href: "/admin/transactions",
    icon: Wallet,
  },
  {
    label: "Risk Center",
    href: "/admin/risk",
    icon: ShieldAlert,
  },
  {
    label: "Audit Logs",
    href: "/admin/audit",
    icon: FileSearch,
  },
  {
    label: "System Monitor",
    href: "/admin/system",
    icon: Activity,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
            >
              <Button
                variant="outline"
                className="flex w-full justify-start gap-2"
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </Button>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}