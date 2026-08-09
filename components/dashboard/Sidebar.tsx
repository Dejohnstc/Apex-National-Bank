"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";
import {
  Plus,
  ChevronRight,
  LogOut,
  UserCircle2,
} from "lucide-react";

import { navigation } from "@/components/navigation/Navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">

      {/* Logo */}

      <div className="border-b border-slate-100 px-7 py-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-xl font-bold text-white shadow-lg">

            A

          </div>

          <div>

            <h1 className="text-lg font-bold text-slate-900">
              Apex National Bank
            </h1>

            <p className="text-xs text-slate-500">
              Premium Digital Banking
            </p>

          </div>

        </div>

      </div>

      {/* Quick Action */}

      <div className="p-5">

        <Link
          href="/dashboard/transfers"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
        >

          <Plus size={18} />

          New Transfer

        </Link>

      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 pb-6">

        {navigation.map((section) => (

          <div
            key={section.section}
            className="mb-7"
          >

            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">

              {section.section}

            </p>

            <div className="space-y-1">

              {section.items.map((item) => {

                const Icon = item.icon;

                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (

                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-2xl px-4 py-3 transition ${
                      active
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className={`rounded-xl p-2 ${
                          active
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                        }`}
                      >

                        <Icon size={18} />

                      </div>

                      <span className="font-medium">
                        {item.title}
                      </span>

                    </div>

                    <ChevronRight
                      size={16}
                      className="text-slate-300"
                    />

                  </Link>

                );
              })}

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-100 p-5">

        <div className="rounded-2xl bg-slate-50 p-4">

          <div className="flex items-center gap-3">

            <UserCircle2
              size={42}
              className="text-slate-500"
            />

            <div>

              <h3 className="font-semibold">
                Customer
              </h3>

              <p className="text-xs text-slate-500">
                Secure Banking
              </p>

            </div>

          </div>

          <LogoutButton />

        </div>

      </div>

    </aside>
  );
}