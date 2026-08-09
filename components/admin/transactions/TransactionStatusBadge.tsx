import { Badge } from "@/components/ui/badge";

import type { TransactionStatus } from "@/types/admin/transaction.types";

interface Props {
  status: TransactionStatus;
}

const styles: Record<TransactionStatus, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  PROCESSING:
    "bg-blue-100 text-blue-700 border-blue-200",

  COMPLETED:
    "bg-green-100 text-green-700 border-green-200",

  FAILED:
    "bg-red-100 text-red-700 border-red-200",

  REVERSED:
    "bg-orange-100 text-orange-700 border-orange-200",

  CANCELLED:
    "bg-gray-100 text-gray-700 border-gray-200",
};

export function TransactionStatusBadge({
  status,
}: Props) {
  return (
    <Badge
      variant="outline"
      className={styles[status]}
    >
      {status}
    </Badge>
  );
}