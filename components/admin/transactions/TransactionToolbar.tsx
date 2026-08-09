"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { TransactionFilters } from "./TransactionFilters";

export function TransactionToolbar() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  function search(value: string) {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.delete("page");

    router.push(
      `/admin/transactions?${params.toString()}`
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            className="pl-9"
            defaultValue={
              searchParams.get(
                "search"
              ) ?? ""
            }
            placeholder="Search transactions..."
            onChange={(e) =>
              search(
                e.target.value
              )
            }
          />
        </div>

        <Button
  onClick={async () => {
    const response =
      await fetch(
        "/api/admin/transactions/export"
      );

    const blob =
      await response.blob();

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "transactions.csv";

    link.click();

    window.URL.revokeObjectURL(
      url
    );
  }}
>
  Export CSV
</Button>
      </div>

      <TransactionFilters />
    </div>
  );
}