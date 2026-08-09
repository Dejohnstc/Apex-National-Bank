import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock3, Smartphone } from "lucide-react";

export function HeroContent() {
  return (
    <div>
      <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
        Modern Digital Banking
      </span>

      <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
        Banking,
        <br />
        redesigned for
        <br />
        modern life.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
        Open accounts, transfer money, manage your finances,
        and grow your wealth through one secure platform built
        for individuals and businesses.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/register">
          <Button size="lg">
            Open Account
          </Button>
        </Link>

        <Link href="/login">
          <Button variant="outline" size="lg">
            Sign In
          </Button>
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          Bank-grade Security
        </div>

        <div className="flex items-center gap-2">
          <Clock3 className="h-5 w-5 text-emerald-600" />
          24/7 Access
        </div>

        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-emerald-600" />
          Mobile First
        </div>
      </div>
    </div>
  );
}