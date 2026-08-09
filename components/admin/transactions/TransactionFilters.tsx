"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TransactionFilters() {
  const router = useRouter();

  const searchParams = useSearchParams();

  function update(
  key: string,
  value: string | null
) {
  const params = new URLSearchParams(
    searchParams.toString()
  );

  if (!value || value === "all") {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  params.delete("page");

  router.push(
    `/admin/transactions?${params.toString()}`
  );
}

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        defaultValue={
          searchParams.get("status") ?? "all"
        }
        onValueChange={(value) =>
          update("status", value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Status
          </SelectItem>

          <SelectItem value="PENDING">
            Pending
          </SelectItem>

          <SelectItem value="PROCESSING">
            Processing
          </SelectItem>

          <SelectItem value="COMPLETED">
            Completed
          </SelectItem>

          <SelectItem value="FAILED">
            Failed
          </SelectItem>

          <SelectItem value="REVERSED">
            Reversed
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={
          searchParams.get("direction") ??
          "all"
        }
        onValueChange={(value) =>
          update("direction", value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Direction" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All
          </SelectItem>

          <SelectItem value="CREDIT">
            Credit
          </SelectItem>

          <SelectItem value="DEBIT">
            Debit
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}