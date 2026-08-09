interface Props {
  status:
    | "DRAFT"
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "FUNDS_AVAILABLE"
    | "REJECTED";
}

export default function DepositStatusBadge({
  status,
}: Props) {
  const styles: Record<
    Props["status"],
    string
  > = {
    DRAFT:
      "bg-gray-100 text-gray-800",

    SUBMITTED:
      "bg-blue-100 text-blue-800",

    UNDER_REVIEW:
      "bg-yellow-100 text-yellow-800",

    APPROVED:
      "bg-green-100 text-green-800",

    FUNDS_AVAILABLE:
      "bg-emerald-100 text-emerald-800",

    REJECTED:
      "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}