"use client";

import type { AdminUser } from "@/types/admin/user.types";

interface Props {
  user: AdminUser;
}

export function UserQuickActions({
  user,
}: Props) {
  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Quick Actions
        </h2>
      </div>

      <div className="space-y-3 p-6">
        <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700">
          Edit Customer
        </button>

        <button className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700">
          Credit Account
        </button>

        <button className="w-full rounded-lg bg-amber-500 px-4 py-3 font-medium text-white hover:bg-amber-600">
          Debit Account
        </button>

        <button className="w-full rounded-lg bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700">
          Suspend User
        </button>

        <button className="w-full rounded-lg border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50">
          Reset Password
        </button>

        <button className="w-full rounded-lg border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50">
          Unlock Account
        </button>
      </div>
    </div>
  );
}