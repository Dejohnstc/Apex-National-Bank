import { ArrowUpRight } from "lucide-react";

export function BalanceCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-500 p-8 text-white">
      <p className="text-sm opacity-90">
        Total Balance
      </p>

      <h2 className="mt-2 text-5xl font-bold">
        $24,580.45
      </h2>

      <div className="mt-6 flex items-center gap-2">
        <ArrowUpRight className="h-5 w-5" />

        <span>+12.4% this month</span>
      </div>
    </div>
  );
}