import { Bell, Settings } from "lucide-react";

export function Header() {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
      <div>
        <p className="text-sm text-slate-500">
          Welcome back
        </p>

        <h3 className="text-xl font-bold text-slate-900">
          Alex Johnson
        </h3>
      </div>

      <div className="flex gap-3">
        <button className="rounded-xl border p-2 hover:bg-slate-50">
          <Bell className="h-5 w-5" />
        </button>

        <button className="rounded-xl border p-2 hover:bg-slate-50">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}