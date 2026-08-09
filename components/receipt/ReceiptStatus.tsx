"use client";

import {
  CheckCircle2,
  Clock3,
  Loader2,
  XCircle,
  RotateCcw,
  Ban,
  AlertTriangle,
} from "lucide-react";

interface Props {
  status:
    | "PENDING"
    | "APPROVED"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED"
    | "REJECTED"
    | "RETURNED"
    | "CANCELLED";
}

const statusConfig = {
  PENDING: {
    color:
      "border-amber-200 bg-amber-50 text-amber-800",
    icon: Clock3,
    label: "Pending Approval",
  },

  APPROVED: {
    color:
      "border-blue-200 bg-blue-50 text-blue-800",
    icon: CheckCircle2,
    label: "Approved",
  },

  PROCESSING: {
    color:
      "border-indigo-200 bg-indigo-50 text-indigo-800",
    icon: Loader2,
    label: "Processing",
  },

  COMPLETED: {
    color:
      "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: CheckCircle2,
    label: "Completed",
  },

  FAILED: {
    color:
      "border-red-200 bg-red-50 text-red-800",
    icon: AlertTriangle,
    label: "Failed",
  },

  REJECTED: {
    color:
      "border-red-200 bg-red-50 text-red-800",
    icon: XCircle,
    label: "Rejected",
  },

  RETURNED: {
    color:
      "border-orange-200 bg-orange-50 text-orange-800",
    icon: RotateCcw,
    label: "Returned",
  },

  CANCELLED: {
    color:
      "border-slate-200 bg-slate-100 text-slate-700",
    icon: Ban,
    label: "Cancelled",
  },
} as const;

export function ReceiptStatus({
  status,
}: Props) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`
        flex w-full items-center justify-center gap-2
        rounded-xl border px-4 py-3
        text-sm font-semibold shadow-sm
        sm:w-auto sm:px-5
        ${config.color}
      `}
    >
      <Icon
        className={`h-5 w-5 ${
          status === "PROCESSING"
            ? "animate-spin"
            : ""
        }`}
      />

      <span>{config.label}</span>
    </div>
  );
}