"use client";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DateRangePickerProps {
  from?: Date;
  to?: Date;

  onFromChange: (
    value: Date | undefined
  ) => void;

  onToChange: (
    value: Date | undefined
  ) => void;
}

function formatDate(
  value?: Date
) {
  if (!value) return "";

  return value
    .toISOString()
    .split("T")[0];
}

export default function DateRangePicker({
  from,
  to,
  onFromChange,
  onToChange,
}: DateRangePickerProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          From
        </label>

        <div className="relative">
          <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <input
            type="date"
            value={formatDate(from)}
            onChange={(e) =>
              onFromChange(
                e.target.value
                  ? new Date(
                      e.target.value
                    )
                  : undefined
              )
            }
            className="flex h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          To
        </label>

        <div className="relative">
          <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <input
            type="date"
            value={formatDate(to)}
            onChange={(e) =>
              onToChange(
                e.target.value
                  ? new Date(
                      e.target.value
                    )
                  : undefined
              )
            }
            className="flex h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm"
          />
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          onFromChange(undefined);
          onToChange(undefined);
        }}
      >
        Clear
      </Button>
    </div>
  );
}