"use client";

import {
  Landmark,
  Globe2,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function WireHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/20 shadow-lg">

      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="relative p-6 lg:p-7">

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-sm">

          <ShieldCheck className="h-4 w-4 text-emerald-600" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Secure Wire Transfer
          </span>

        </div>

        <div className="mt-5">

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">

            Send Money

            <span className="block bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              Anywhere With Confidence
            </span>

          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 lg:text-base">
            Send domestic and international wire transfers securely using
            Apex National Bank&apos;s protected banking network with fraud
            monitoring and AML verification.
          </p>

        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-3">

          <FeatureCard
            icon={<Landmark className="h-5 w-5 text-emerald-700" />}
            title="Domestic"
            value="Next Business Day"
          />

          <FeatureCard
            icon={<Globe2 className="h-5 w-5 text-blue-700" />}
            title="International"
            value="1–5 Business Days"
          />

          <FeatureCard
            icon={<Clock3 className="h-5 w-5 text-amber-600" />}
            title="Availability"
            value="24/7 Secure Banking"
          />

        </div>

      </div>

    </section>
  );
}

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function FeatureCard({
  icon,
  title,
  value,
}: CardProps) {
  return (
    <div className="rounded-xl border bg-white/90 p-4 shadow-sm">

      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
        {icon}
      </div>

      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-base font-semibold text-slate-900">
        {value}
      </h3>

    </div>
  );
}