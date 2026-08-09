import { Badge } from "@/components/ui/badge";

import type { LoanType } from "@/services/admin/loans";

interface Props {
  type: LoanType;
}

export function LoanTypeBadge({
  type,
}: Props) {
  return (
    <Badge variant="secondary">
      {type}
    </Badge>
  );
}