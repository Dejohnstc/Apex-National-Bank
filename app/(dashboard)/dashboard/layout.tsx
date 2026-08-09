import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileDrawer } from "@/components/navigation/MobileDrawer";
import { BottomNav } from "@/components/navigation/BottomNav";
import { BankingHeader } from "@/components/navigation/BankingHeader";


interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Prevent admins from accessing customer dashboard
  if (session.user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen">

      {/* Desktop Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex min-h-screen flex-col lg:ml-72">

        {/* Mobile Navigation */}

        <MobileDrawer />

        {/* Top Banking Header */}

        <BankingHeader />

        {/* Content */}

        <main className="flex-1 p-4 pb-24 sm:p-6 lg:p-8">

          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>

        </main>

        {/* Bottom Navigation */}

        <BottomNav />

        {/* Tawk.to Support Chat */}

        

      </div>

    </div>
  );
}