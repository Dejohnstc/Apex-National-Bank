"use client";

import { useEffect, useState } from "react";
import { Bell, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

interface AdminDashboardHeaderProps {
  title?: string;
  description?: string;
}

export function AdminDashboardHeader({
  title = "Admin Operations Center",
  description = "Manage your banking platform from one place.",
}: AdminDashboardHeaderProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setNow(new Date());
    };

    updateTime();

    const timer = window.setInterval(
      updateTime,
      1000
    );

    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="flex flex-col gap-6 rounded-2xl border bg-background p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      <div>
        <p className="text-sm text-muted-foreground">
          Apex National Bank
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">

          <span>
            {now
              ? now.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Loading..."}
          </span>

          <span>
            {now
              ? now.toLocaleTimeString("en-US")
              : "--:--:--"}
          </span>

        </div>
      </div>

      <div className="flex items-center gap-3">

        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>

        <Button
          size="icon"
          variant="outline"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3 rounded-xl border px-3 py-2">

          <Avatar>
            <AvatarFallback>
              AD
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-semibold">
              Administrator
            </p>

            <p className="text-xs text-muted-foreground">
              Operations Team
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}