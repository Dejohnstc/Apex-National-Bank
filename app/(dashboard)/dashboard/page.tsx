import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import { getDashboard } from "@/services/dashboard/gettDashboard";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BalanceCards } from "@/components/dashboard/BalanceCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import PendingActivity from "@/components/dashboard/PendingActivity";
import NotificationsPreview from "@/components/dashboard/NotificationsPreview";
import ExchangeRates from "@/components/dashboard/ExchangeRate";
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const dashboard = await getDashboard({
    userId: session.user.id,
  });

 return (
  <div className="space-y-8">
<DashboardHeader
  firstName={dashboard.customer.firstName}
/>
    <BalanceCards
      accounts={dashboard.accounts}
      totalBalance={dashboard.totalBalance}
    />
 <RecentTransactions
      transactions={dashboard.recentTransactions}
    />
    <QuickActions />
<ExchangeRates
  exchangeRates={dashboard.exchangeRates}
/>
    {/* Dashboard Middle */}

    <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">

      <PendingActivity
        wires={dashboard.pendingWires}
        achTransfers={dashboard.pendingAchTransfers}
      />

      <NotificationsPreview
        notifications={dashboard.notifications}
      />

    </div>

   

  </div>
);
}