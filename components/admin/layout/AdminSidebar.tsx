"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Landmark,
  ArrowRightLeft,
  CreditCard,
  ReceiptText,
  PiggyBank,
  Settings,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Accounts",
    href: "/admin/accounts",
    icon: Landmark,
  },
  {
    label: "Transactions",
    href: "/admin/transactions",
    icon: ReceiptText,
  },
  {
    label: "Transfers",
    href: "/admin/transfers",
    icon: ArrowRightLeft,
  },
  {
    label: "Cards",
    href: "/admin/cards",
    icon: CreditCard,
  },
  {
    label: "Loans",
    href: "/admin/loans",
    icon: PiggyBank,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-slate-950 text-white">
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-600 p-2">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Apex Admin
            </h2>

            <p className="text-xs text-slate-400">
              Banking Control Center
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(
              `${item.href}/`
            );

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />

              <span className="font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-400">
            System Status
          </p>

          <div className="mt-3 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

            <span className="text-sm">
              All Services Online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}