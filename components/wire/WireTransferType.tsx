"use client";

import {
  Landmark,
  Globe2,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface Props {
  value: "DOMESTIC" | "INTERNATIONAL";
  onChange: (
    value: "DOMESTIC" | "INTERNATIONAL"
  ) => void;
}

const options = [
  {
    value: "DOMESTIC" as const,
    title: "Domestic Wire",
    subtitle: "United States",
    fee: "$25",
    eta: "Next Business Day",
    icon: Landmark,
  },
  {
    value: "INTERNATIONAL" as const,
    title: "International Wire",
    subtitle: "Worldwide",
    fee: "$45",
    eta: "1–5 Business Days",
    icon: Globe2,
  },
];

export default function WireTransferType({
  value,
  onChange,
}: Props) {
  return (
    <section className="space-y-5">

      <div>

        <h2 className="text-lg font-bold text-slate-900">
          Transfer Type
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the wire service you want to use.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {options.map((option) => {

          const Icon = option.icon;

          const active =
            value === option.value;

          return (

            <button
              key={option.value}
              type="button"
              onClick={() =>
                onChange(option.value)
              }
              className={`
                relative rounded-2xl border p-5 text-left transition-all duration-200
                ${
                  active
                    ? "border-emerald-500 bg-emerald-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md"
                }
              `}
            >

              {active && (

                <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-emerald-600" />

              )}

              <div className="flex items-center gap-3">

                <div
                  className={`
                    flex h-11 w-11 items-center justify-center rounded-xl
                    ${
                      active
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }
                  `}
                >

                  <Icon className="h-5 w-5" />

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {option.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {option.subtitle}
                  </p>

                </div>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">

                <div>

                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Fee
                  </p>

                  <p className="mt-1 text-base font-bold text-slate-900">
                    {option.fee}
                  </p>

                </div>

                <div className="text-right">

                  <div className="flex items-center justify-end gap-1">

                    <Clock3 className="h-3.5 w-3.5 text-emerald-600" />

                    <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Delivery
                    </span>

                  </div>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {option.eta}
                  </p>

                </div>

              </div>

            </button>

          );

        })}

      </div>

    </section>
  );
}