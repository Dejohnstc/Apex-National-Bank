"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface LoginRecord {
  id: string;
  browser: string | null;
  device: string | null;
  os: string | null;
  location: string | null;
  ip: string | null;
  success: boolean;
  createdAt: string | Date;
}

interface Props {
  history: LoginRecord[];
}

export default function LoginHistoryCard({
  history,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Login History
        </CardTitle>

        <CardDescription>
          Recent sign-ins to your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {history.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No login history found.
          </p>
        )}

        {history.map((login) => (
          <div
            key={login.id}
            className="flex items-start justify-between rounded-lg border p-4"
          >
            <div className="space-y-1">
              <p className="font-medium">
                {login.browser ?? "Unknown Browser"}
              </p>

              <p className="text-sm text-muted-foreground">
                {login.device ?? "Unknown Device"}
                {login.os
                  ? ` • ${login.os}`
                  : ""}
              </p>

              <p className="text-sm text-muted-foreground">
                {login.location ??
                  "Unknown Location"}
              </p>

              <p className="text-xs text-muted-foreground">
                {login.ip ??
                  "Unknown IP"}
              </p>

              <p className="text-xs text-muted-foreground">
                {new Date(
                  login.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <Badge
              variant={
                login.success
                  ? "default"
                  : "destructive"
              }
            >
              {login.success
                ? "Success"
                : "Failed"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}