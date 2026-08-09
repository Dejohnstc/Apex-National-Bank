"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatementFiltersProps {
  search: string;
  type: string;

  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export default function StatementFilters({
  search,
  type,
  onSearchChange,
  onTypeChange,
}: StatementFiltersProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          value={search}
          placeholder="Search description or reference..."
          className="pl-9"
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      <div className="w-full lg:w-56">
        <Select
          value={type}
          onValueChange={(value) =>
  onTypeChange(value ?? "all")
}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Transactions" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Transactions
            </SelectItem>

            <SelectItem value="deposit">
              Deposits
            </SelectItem>

            <SelectItem value="withdrawal">
              Withdrawals
            </SelectItem>

            <SelectItem value="transfer">
              Transfers
            </SelectItem>

            <SelectItem value="payment">
              Payments
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}