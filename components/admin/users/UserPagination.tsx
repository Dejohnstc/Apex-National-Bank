"use client";

import type { Pagination } from "@/types/admin/user.types";

interface Props {
  pagination: Pagination;
}

export function UserPagination({ pagination }: Props) {
  const { page, totalPages, total } = pagination;

  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-4">
      <p className="text-sm text-gray-600">
        Showing page <strong>{page}</strong> of{" "}
        <strong>{totalPages}</strong> ({total} users)
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={page >= totalPages}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}