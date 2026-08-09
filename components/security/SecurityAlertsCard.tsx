"use client";

import {
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface SecurityAlertItem {
  id: string;
  type: string;
  title: string;
  description: string;
  read: boolean;
  createdAt: string | Date;
}

interface Props {
  alerts: SecurityAlertItem[];
}

export default function SecurityAlertsCard({
  alerts,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Security Alerts
        </CardTitle>

        <CardDescription>
          Important security events
          related to your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {alerts.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No security alerts.
          </p>
        )}

        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start justify-between rounded-lg border p-4"
          >
            <div className="flex gap-3">
              {alert.read ? (
                <ShieldCheck className="mt-1 h-5 w-5 text-green-600" />
              ) : (
                <ShieldAlert className="mt-1 h-5 w-5 text-amber-500" />
              )}

              <div>
                <p className="font-medium">
                  {alert.title}
                </p>

                <p className="text-sm text-muted-foreground">
                  {alert.description}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(
                    alert.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            <Badge
              variant={
                alert.read
                  ? "secondary"
                  : "default"
              }
            >
              {alert.read
                ? "Read"
                : "New"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}