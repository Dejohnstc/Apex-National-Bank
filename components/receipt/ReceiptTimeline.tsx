"use client";

import {
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

import type {
  ReceiptTimelineItem,
} from "./types";

import {
  formatDate,
} from "./helper";

interface Props {
  items: ReceiptTimelineItem[];
}

export function ReceiptTimeline({
  items,
}: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      {/* Header */}

      <div className="border-b bg-gradient-to-r from-slate-50 to-white px-6 py-5">

        <div className="flex items-center gap-3">

          <Clock3 className="h-6 w-6 text-emerald-600" />

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Processing Timeline
            </h2>

            <p className="text-sm text-slate-500">
              Every stage of this transaction from submission to completion.
            </p>

          </div>

        </div>

      </div>

      {/* Timeline */}

      <div className="p-6 sm:p-8">

        <div className="space-y-8">

          {items.map((item, index) => (

            <div
              key={index}
              className="relative flex gap-5"
            >

              {/* Vertical Line */}

              {index !== items.length - 1 && (

                <div className="absolute left-4 top-9 bottom-0 w-px bg-slate-200" />

              )}

              {/* Status Icon */}

              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">

                {item.completed ? (

                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />

                ) : (

                  <Circle className="h-8 w-8 text-slate-300" />

                )}

              </div>

              {/* Content */}

              <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-5">

                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>

                    {item.description && (

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>

                    )}

                  </div>

                  {item.date && (

                    <div className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm">

                      {formatDate(item.date)}

                    </div>

                  )}

                </div>

                {/* Status */}

                <div className="mt-4">

                  {item.completed ? (

                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">

                      Completed

                    </span>

                  ) : (

                    <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">

                      Pending

                    </span>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}