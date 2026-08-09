import Link from "next/link";
import { navigation } from "@/lib/design";

export function DesktopNav() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-slate-700 transition-colors hover:text-emerald-600"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}