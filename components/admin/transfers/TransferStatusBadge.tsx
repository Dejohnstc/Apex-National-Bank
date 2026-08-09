import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

const colors: Record<string, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  PROCESSING:
    "bg-blue-100 text-blue-700 border-blue-200",

  COMPLETED:
    "bg-green-100 text-green-700 border-green-200",

  FAILED:
    "bg-red-100 text-red-700 border-red-200",

  REJECTED:
    "bg-red-100 text-red-700 border-red-200",

  CANCELLED:
    "bg-gray-100 text-gray-700 border-gray-200",
};

export function TransferStatusBadge({
  status,
}: Props) {
  return (
    <Badge
      variant="outline"
      className={
        colors[status] ??
        colors.PENDING
      }
    >
      {status}
    </Badge>
  );
}