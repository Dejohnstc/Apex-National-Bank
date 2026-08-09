"use client";

import Link from "next/link";
import { Eye, Pencil, Ban } from "lucide-react";

import type { AdminUser } from "@/types/admin/user.types";

interface Props {
  user: AdminUser;
}

export function UserRowActions({ user }: Props) {
  return (
    <div className="flex justify-end gap-2">
      <Link
        href={`/admin/users/${user.id}`}
        className="rounded-md border p-2 hover:bg-gray-100"
        title="View User"
      >
        <Eye className="h-4 w-4" />
      </Link>

      <button
        type="button"
        className="rounded-md border p-2 hover:bg-gray-100"
        title="Edit User"
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50"
        title="Suspend User"
      >
        <Ban className="h-4 w-4" />
      </button>
    </div>
  );
}