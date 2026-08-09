"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  ChevronLeft,
  Menu,
  Search,
  UserCircle2,
} from "lucide-react";

import NotificationBell from "@/components/notifications/NotificationBell";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Navbar/Logo";

export function BankingHeader() {
  const router = useRouter();

  const pathname = usePathname();

  const isDashboard =
    pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

      <div className="flex h-16 items-center gap-4 px-4 lg:px-8">

        {/* Mobile Left */}

        <div className="flex items-center gap-3 lg:hidden">

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(
                new Event("open-mobile-menu")
              )
            }
            className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md active:scale-95"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </button>

          <div className="scale-[0.88] origin-left">
            <Logo />
          </div>

        </div>

        {/* Desktop Left */}

        <div className="hidden lg:flex items-center">

          {!isDashboard && (

            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-4 rounded-xl"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

          )}

          <div className="scale-95 origin-left">
            <Logo />
          </div>

        </div>

        {/* Search */}

        <div className="hidden flex-1 justify-center lg:flex">

          <div className="relative w-full max-w-2xl">

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search transactions, transfers..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:bg-white"
            />

          </div>

        </div>

        {/* Right */}

        <div className="ml-auto flex items-center gap-3">

          <NotificationBell />

          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm lg:flex">

            <UserCircle2 className="h-9 w-9 text-slate-500" />

            <div>

              <p className="text-sm font-semibold text-slate-900">
                Customer
              </p>

              <p className="text-xs text-slate-500">
                Secure Banking
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}