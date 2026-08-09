"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Select } from "@/components/ui/select";

export function AccountFilters() {
  const router = useRouter();

  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");

    router.push(
      `/admin/accounts?${params.toString()}`
    );
  }

  return (
    <div className="flex gap-3">
      <Select
        onValueChange={(value) =>
          update("status", String(value))
        }
      >
        {/* options */}
      </Select>

      <Select
        onValueChange={(value) =>
          update("type", String(value))
        }
      >
        {/* options */}
      </Select>
    </div>
  );
}