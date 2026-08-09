"use client";

import { Search } from "lucide-react";

export function UserToolbar() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search users..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-black"
        />
      </div>

      <div className="flex gap-3">
        <select className="rounded-lg border px-3 py-2">
          <option>All Roles</option>
          <option>CUSTOMER</option>
          <option>ADMIN</option>
          <option>SUPER_ADMIN</option>
        </select>

        <select className="rounded-lg border px-3 py-2">
          <option>All Status</option>
          <option>ACTIVE</option>
          <option>PENDING</option>
          <option>SUSPENDED</option>
        </select>

        <select className="rounded-lg border px-3 py-2">
          <option>Newest</option>
          <option>Oldest</option>
          <option>Last Login</option>
        </select>
      </div>
    </div>
  );
}