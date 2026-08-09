"use client";

import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { NavActions } from "./NavActions";
import { useNavbar } from "./hooks";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const {
    mobileOpen,
    scrolled,
    toggleMenu,
  } = useNavbar();

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Logo />

          <DesktopNav />

          <NavActions />

          <button
            onClick={toggleMenu}
            className="rounded-lg p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* MobileDrawer goes here */}
    </>
  );
}