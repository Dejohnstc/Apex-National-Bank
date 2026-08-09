"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  X,
  ChevronRight,
  UserCircle2,
  LogOut,
} from "lucide-react";

import { navigation } from "./Navigation";

export function MobileDrawer() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);

    window.addEventListener(
      "open-mobile-menu",
      handler
    );

    return () =>
      window.removeEventListener(
        "open-mobile-menu",
        handler
      );
  }, []);

 

  return (
    <>
      {/* Overlay */}

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-80 max-w-[85%] flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Apex National Bank
            </h2>

            <p className="text-sm text-slate-500">
              Premium Digital Banking
            </p>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Navigation */}

        <div className="flex-1 overflow-y-auto px-4 py-6">

          {navigation.map((section) => (

            <div
              key={section.section}
              className="mb-7"
            >

              <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">

                {section.section}

              </p>

              <div className="space-y-1">

                {section.items.map((item) => {

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
  onClick={() => setOpen(false)}

                      className={`group flex items-center justify-between rounded-2xl px-4 py-3 transition ${
                        active
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">

                        <div
                          className={`rounded-xl p-2 ${
                            active
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100"
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
                        className="text-slate-400"
                      />

                    </Link>
                  );
                })}

              </div>

            </div>

          ))}

        </div>

        {/* Footer */}

        <div className="border-t p-5">

          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

            <UserCircle2
              size={44}
              className="text-slate-500"
            />

            <div>

              <h3 className="font-semibold text-slate-900">
                Customer
              </h3>

              <p className="text-xs text-slate-500">
                Secure Banking
              </p>

            </div>

          </div>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 font-medium transition hover:bg-slate-50">

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}