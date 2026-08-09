import { Header } from "./Header";
import { BalanceCard } from "./BalanceCard";
import { AccountSummary } from "./AccountSummary";
import { QuickActions } from "./QuickActions";
import { Transactions } from "./Transactions";

export function DashboardPreview() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl">
      <Header />

      <div className="mt-6 space-y-5">
        <BalanceCard />

        <AccountSummary />

        <QuickActions />

        <Transactions />
      </div>
    </div>
  );
}