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

interface TransactionToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  type: string;
  onTypeChange: (value: string | null) => void;

  status: string;
  onStatusChange: (value: string | null) => void;
}

export function TransactionToolbar({
  search,
  onSearchChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
}: TransactionToolbarProps) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search transactions..."
            className="pl-10"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
         <Select
  value={type}
  onValueChange={(value) => onTypeChange(value)}
>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Types
              </SelectItem>

              <SelectItem value="TRANSFER">
                Transfer
              </SelectItem>

              <SelectItem value="DEPOSIT">
                Deposit
              </SelectItem>

              <SelectItem value="WITHDRAWAL">
                Withdrawal
              </SelectItem>

              <SelectItem value="PAYMENT">
                Payment
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
  value={status}
  onValueChange={(value) => onStatusChange(value)}
>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Status
              </SelectItem>

              <SelectItem value="COMPLETED">
                Completed
              </SelectItem>

              <SelectItem value="PENDING">
                Pending
              </SelectItem>

              <SelectItem value="FAILED">
                Failed
              </SelectItem>

              <SelectItem value="CANCELLED">
                Cancelled
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}