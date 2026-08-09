"use client";

import type { ReactNode } from "react";

import { Logo } from "@/components/landing/Navbar/Logo";

interface ReceiptLayoutProps {
  title: string;
  subtitle?: string;

  status: ReactNode;

  actions?: ReactNode;

  children: ReactNode;
}

export function ReceiptLayout({
  title,
  subtitle,
  status,
  actions,
  children,
}: ReceiptLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 px-3 py-4 sm:px-6 sm:py-8 print:bg-white print:p-0">

      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border bg-white shadow-2xl print:max-w-full print:rounded-none print:border-0 print:shadow-none">

        {/* ================= HEADER ================= */}

        <header className="relative overflow-hidden border-b bg-gradient-to-r from-white via-white to-emerald-50">

          {/* Watermark */}

          <div className="pointer-events-none absolute right-4 top-4 hidden select-none text-7xl font-black uppercase tracking-widest text-slate-100 lg:block">

            APEX

          </div>

          <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-10 lg:py-8">

            {/* Logo */}

            <div className="flex items-start gap-4">

              <Logo />

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
                  Official Customer Copy
                </p>

                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {title}
                </h1>

                {subtitle && (
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    {subtitle}
                  </p>
                )}

              </div>

            </div>

            {/* Status */}

            <div className="w-full lg:w-auto">
              {status}
            </div>

          </div>

        </header>

        {/* ================= ACTIONS ================= */}

        {actions && (
          <div className="border-b bg-slate-50 px-5 py-4 sm:px-8 print:hidden">

            {actions}

          </div>
        )}

        {/* ================= BODY ================= */}

        <main className="space-y-8 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">

          {children}

        </main>

        {/* ================= FOOTER ================= */}

        <footer className="border-t bg-slate-50">

          <div className="flex flex-col gap-4 px-5 py-5 text-center sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:text-left">

            <div>

              <p className="font-bold text-slate-900">
                Apex National Bank
              </p>

              <p className="text-sm text-slate-500">
                Official Electronic Banking Receipt
              </p>

            </div>

            <div className="text-xs leading-5 text-slate-500">

              Generated automatically by the Apex National Bank
              secure transaction platform.

            </div>

          </div>

        </footer>

      </div>

    </div>
  );
}