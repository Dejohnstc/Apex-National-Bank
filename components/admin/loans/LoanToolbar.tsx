"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LoanFilters } from "./LoanFilters";

export function LoanToolbar() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search loan number..."
            className="pl-9"
          />
        </div>

        <Button>
          Export
        </Button>
      </div>

      <LoanFilters />
    </div>
  );
}