"use client";

import { CalendarDays } from "lucide-react";

interface DashboardHeaderProps {
  firstName?: string;
}

export function DashboardHeader({
  firstName = "Customer",
}: DashboardHeaderProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );

  return (
    <section className="mb-5">

      <div className="flex items-start justify-between gap-4">

        {/* Greeting */}

        <div className="min-w-0">

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">

            {greeting},{" "}

            <span className="text-emerald-700">
              {firstName}
            </span>

            👋

          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back.
          </p>

        </div>

        {/* Date */}

        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">

          <CalendarDays className="h-4 w-4 text-emerald-700" />

          <span className="text-sm font-semibold text-slate-700">
            {today}
          </span>

        </div>

      </div>

    </section>
  );
}