"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { TransferFilters } from "./TransferFilters";

export function TransferToolbar() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            className="pl-9"
            placeholder="Search transfers..."
          />
        </div>

        <Button>
          Export CSV
        </Button>
      </div>

      <TransferFilters />
    </div>
  );
}