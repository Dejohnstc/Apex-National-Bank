"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CardFilters } from "./CardFilters";

export function CardToolbar() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search cards..."
            className="pl-9"
          />
        </div>

        <Button>
          Export
        </Button>
      </div>

      <CardFilters />
    </div>
  );
}