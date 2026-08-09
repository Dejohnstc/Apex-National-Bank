"use client";

import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <div className="relative w-full max-w-md">

        <Search
          className="absolute left-3 top-3 text-slate-400"
          size={18}
        />

        <Input
          placeholder="Search..."
          className="pl-10"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell
          className="cursor-pointer text-slate-600"
          size={22}
        />

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">
            A
          </div>

          <div>

            <p className="font-semibold">
              Welcome
            </p>

            <p className="text-xs text-slate-500">
              Customer
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}