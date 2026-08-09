"use client";

import Link from "next/link";

import type { AdminUser } from "@/types/admin/user.types";

import { UserStatusBadge } from "./UserStatusBadge";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserRowActions } from "./UserRowActions";

interface Props {
  users: AdminUser[];
}

export function UserTable({ users }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Customer ID</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Account Type</th>
              <th className="px-6 py-4">2FA</th>
              <th className="px-6 py-4">Last Login</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-sm text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr
                key={user.id}
                className="transition hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="block"
                  >
                    <div className="font-medium text-gray-900">
                      {user.fullName}
                    </div>

                    <div className="mt-1 text-sm text-gray-500">
                      {user.email}
                    </div>

                    <div className="text-xs text-gray-400">
                      @{user.username}
                    </div>
                  </Link>
                </td>

                <td className="px-6 py-4 font-mono text-sm">
                  {user.customerId}
                </td>

                <td className="px-6 py-4">
                  <UserRoleBadge role={user.role} />
                </td>

                <td className="px-6 py-4">
                  <UserStatusBadge status={user.status} />
                </td>

                <td className="px-6 py-4">
                  {user.accountType}
                </td>

                <td className="px-6 py-4">
                  {user.twoFactorEnabled ? (
                    <span className="font-medium text-green-600">
                      Enabled
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      Disabled
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "Never"}
                </td>

                <td className="px-6 py-4 text-right">
                  <UserRowActions user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}