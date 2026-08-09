"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { AccountFilters } from "./AccountFilters";
import { Button } from "@/components/ui/button";

export function AccountToolbar() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          className="pl-9"
          placeholder="Search accounts..."
        />
        <AccountFilters />
      </div>

      <Button>
        Export
      </Button>
    </div>
  );
}