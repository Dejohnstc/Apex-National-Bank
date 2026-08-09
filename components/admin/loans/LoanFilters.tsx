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

export function LoanFilters() {
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
      `/admin/loans?${params.toString()}`
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        defaultValue={
          searchParams.get("status") ??
          "all"
        }
        onValueChange={(value) =>
          update("status", value)
        }
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Status
          </SelectItem>

          <SelectItem value="PENDING">
            Pending
          </SelectItem>

          <SelectItem value="ACTIVE">
            Active
          </SelectItem>

          <SelectItem value="PAID">
            Paid
          </SelectItem>

          <SelectItem value="DEFAULTED">
            Defaulted
          </SelectItem>

          <SelectItem value="REJECTED">
            Rejected
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={
          searchParams.get("type") ??
          "all"
        }
        onValueChange={(value) =>
          update("type", value)
        }
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Types
          </SelectItem>

          <SelectItem value="PERSONAL">
            Personal
          </SelectItem>

          <SelectItem value="AUTO">
            Auto
          </SelectItem>

          <SelectItem value="MORTGAGE">
            Mortgage
          </SelectItem>

          <SelectItem value="BUSINESS">
            Business
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}