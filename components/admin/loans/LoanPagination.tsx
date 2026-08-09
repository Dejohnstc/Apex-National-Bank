"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Button } from "@/components/ui/button";

interface Props {
  pagination: {
    page: number;
    totalPages: number;
  };
}

export function LoanPagination({
  pagination,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function go(page: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", page.toString());

    router.push(
      `/admin/loans?${params.toString()}`
    );
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {pagination.page} of{" "}
        {pagination.totalPages}
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={pagination.page <= 1}
          onClick={() =>
            go(pagination.page - 1)
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled={
            pagination.page >=
            pagination.totalPages
          }
          onClick={() =>
            go(pagination.page + 1)
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}