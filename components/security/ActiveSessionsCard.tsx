"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  Laptop,
  Smartphone,
  Monitor,
  LogOut,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { revokeSessionAction } from "@/actions/security/revokeSession";

interface ActiveSessionItem {
  id: string;
  device: string | null;
  browser: string | null;
  os: string | null;
  ip: string | null;
  location: string | null;
  lastActive: string | Date;
  current?: boolean;
}

interface Props {
  sessions: ActiveSessionItem[];
}

function getIcon(device: string | null) {
  const value = device?.toLowerCase() ?? "";

  if (
    value.includes("iphone") ||
    value.includes("android")
  ) {
    return Smartphone;
  }

  if (
    value.includes("windows") ||
    value.includes("mac") ||
    value.includes("linux")
  ) {
    return Laptop;
  }

  return Monitor;
}

export default function ActiveSessionsCard({
  sessions,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  function signOutSession(id: string) {
    if (
      !window.confirm(
        "Sign out this session?"
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result =
        await revokeSessionAction(id);

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to sign out session."
        );

        return;
      }

      toast.success(
        "Session ended successfully."
      );
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Active Sessions
        </CardTitle>

        <CardDescription>
          Devices currently signed in to
          your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {sessions.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No active sessions found.
          </p>
        )}

        {sessions.map((session) => {
          const Icon = getIcon(
            session.device
          );

          return (
            <div
              key={session.id}
              className="flex items-start justify-between rounded-lg border p-4"
            >
              <div className="flex gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {session.device ??
                        "Unknown Device"}
                    </p>

                    {session.current && (
                      <Badge variant="secondary">
                        Current
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {session.browser}
                    {session.os
                      ? ` • ${session.os}`
                      : ""}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {session.location ??
                      "Unknown Location"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {session.ip ??
                      "Unknown IP"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Last active{" "}
                    {new Date(
                      session.lastActive
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              {!session.current && (
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isPending}
                  onClick={() =>
                    signOutSession(
                      session.id
                    )
                  }
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}