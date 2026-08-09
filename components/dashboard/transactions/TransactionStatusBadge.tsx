interface Props {
  status: string;
}

const statusStyles: Record<string, string> = {
  COMPLETED:
    "bg-green-100 text-green-700 border-green-200",

  PENDING:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  FAILED:
    "bg-red-100 text-red-700 border-red-200",

  CANCELLED:
    "bg-gray-100 text-gray-700 border-gray-200",
};

export function TransactionStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        statusStyles[status] ??
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}