"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium transition hover:bg-slate-50 hover:shadow-sm"
    >
      <LogOut className="h-5 w-5" />
      Logout
    </button>
  );
}