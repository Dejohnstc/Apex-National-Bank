import { ReceiptStatus } from "./types";

export const RECEIPT_STATUS_COLORS: Record<
  ReceiptStatus,
  string
> = {
  PENDING:
    "bg-yellow-100 text-yellow-800 border-yellow-300",

  APPROVED:
    "bg-blue-100 text-blue-800 border-blue-300",

  PROCESSING:
    "bg-indigo-100 text-indigo-800 border-indigo-300",

  COMPLETED:
    "bg-green-100 text-green-800 border-green-300",

  FAILED:
    "bg-red-100 text-red-800 border-red-300",

  REJECTED:
    "bg-red-100 text-red-800 border-red-300",

  RETURNED:
    "bg-orange-100 text-orange-800 border-orange-300",

  CANCELLED:
    "bg-gray-100 text-gray-700 border-gray-300",
};