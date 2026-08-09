"use client";

import {
  CheckCircle2,
  Shield,
  Smartphone,
  Clock,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface SecurityOverviewProps {
  twoFactorEnabled?: boolean;
  activeSessions?: number;
  trustedDevices?: number;
  lastPasswordChanged?: string | null;
}

export default function SecurityOverview({
  twoFactorEnabled = false,
  activeSessions = 1,
  trustedDevices = 0,
  lastPasswordChanged,
}: SecurityOverviewProps) {
  const items = [
    {
      title: "Two-Factor Authentication",
      value: twoFactorEnabled
        ? "Enabled"
        : "Disabled",
      icon: Shield,
    },
    {
      title: "Active Sessions",
      value: activeSessions.toString(),
      icon: Smartphone,
    },
    {
      title: "Trusted Devices",
      value: trustedDevices.toString(),
      icon: CheckCircle2,
    },
    {
      title: "Password Updated",
      value:
        lastPasswordChanged ??
        "Never",
      icon: Clock,
    },
  ];

  return (
    <Card>
      <CardContent className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-xl border p-4"
            >
              <div className="rounded-full bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <p className="text-lg font-semibold">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}