import { Badge } from "@/components/ui/badge";

import type { LoanStatus } from "@/services/admin/loans";

interface Props {
  status: LoanStatus;
}

const variants: Record<LoanStatus, string> = {
  ACTIVE:
    "bg-green-100 text-green-700 border-green-200",

  PENDING:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  PAID:
    "bg-blue-100 text-blue-700 border-blue-200",

  DEFAULTED:
    "bg-red-100 text-red-700 border-red-200",

  REJECTED:
    "bg-gray-100 text-gray-700 border-gray-200",
};

export function LoanStatusBadge({
  status,
}: Props) {
  return (
    <Badge
      variant="outline"
      className={variants[status]}
    >
      {status}
    </Badge>
  );
}