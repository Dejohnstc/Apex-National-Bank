"use client";

import {
  CheckCircle2,
  FileText,
  Eye,
  Receipt,
} from "lucide-react";

interface Props {
  step: 1 | 2 | 3;
}

const steps = [
  {
    number: 1,
    title: "Transfer Details",
    description: "Enter wire information",
    icon: FileText,
  },
  {
    number: 2,
    title: "Review",
    description: "Verify before sending",
    icon: Eye,
  },
  {
    number: 3,
    title: "Receipt",
    description: "Confirmation",
    icon: Receipt,
  },
] as const;

export default function WireStepper({
  step,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        {steps.map((item, index) => {
          const Icon = item.icon;

          const completed =
            item.number < step;

          const active =
            item.number === step;

          return (
            <div
              key={item.number}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">

                <div
                  className={`
                  flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all
                  ${
                    completed
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : active
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-slate-300 bg-white text-slate-400"
                  }
                `}
                >
                  {completed ? (
                    <CheckCircle2 className="h-7 w-7" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </div>

                <div className="mt-4 text-center">

                  <p
                    className={`text-sm font-semibold ${
                      active || completed
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>

                </div>

              </div>

              {index < steps.length - 1 && (
                <div className="mx-5 hidden h-[2px] flex-1 rounded-full bg-slate-200 md:block">

                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      completed
                        ? "w-full bg-emerald-600"
                        : "w-0"
                    }`}
                  />

                </div>
              )}
            </div>
          );
        })}

      </div>

    </section>
  );
}