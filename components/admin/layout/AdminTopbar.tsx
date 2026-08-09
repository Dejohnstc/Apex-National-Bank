"use client";

import { Bell, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

export function AdminTopbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold">
          Apex National Bank
        </h2>

        <p className="text-sm text-muted-foreground">
          Administration Portal
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.location.reload()
          }
        >
          <RefreshCw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
        >
          <Bell className="h-4 w-4" />
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