"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Landmark,
  ArrowRightLeft,
  Receipt,
  User,
} from "lucide-react";

const items = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Accounts",
    href: "/dashboard/accounts",
    icon: Landmark,
  },
  {
    label: "Transfer",
    href: "/dashboard/transfers",
    icon: ArrowRightLeft,
  },
  {
    label: "Activity",
    href: "/dashboard/transactions",
    icon: Receipt,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden">

      <div className="grid grid-cols-5">

        {items.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(
              item.href + "/"
            );

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-1 py-3"
            >

              {active && (
                <div className="absolute left-1/2 top-1 h-1 w-10 -translate-x-1/2 rounded-full bg-emerald-600" />
              )}

              <div
                className={`rounded-xl p-2 transition-all ${
                  active
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-slate-500"
                }`}
              >
                <Icon size={22} />
              </div>

              <span
                className={`text-[11px] font-medium ${
                  active
                    ? "text-emerald-700"
                    : "text-slate-500"
                }`}
              >
                {item.label}
              </span>

            </Link>
          );
        })}

      </div>

      {/* iPhone Safe Area */}

      <div className="h-[env(safe-area-inset-bottom)] bg-white" />

    </nav>
  );
}