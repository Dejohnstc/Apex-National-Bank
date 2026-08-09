"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CardFilters() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  function update(
    key: string,
    value: string | null
  ) {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (
      !value ||
      value === "all"
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    router.push(
      `/admin/cards?${params.toString()}`
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        defaultValue={
          searchParams.get(
            "status"
          ) ?? "all"
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

          <SelectItem value="ACTIVE">
            Active
          </SelectItem>

          <SelectItem value="FROZEN">
            Frozen
          </SelectItem>

          <SelectItem value="BLOCKED">
            Blocked
          </SelectItem>

          <SelectItem value="EXPIRED">
            Expired
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={
          searchParams.get(
            "type"
          ) ?? "all"
        }
        onValueChange={(value) =>
          update("type", value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Types
          </SelectItem>

          <SelectItem value="DEBIT">
            Debit
          </SelectItem>

          <SelectItem value="CREDIT">
            Credit
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}