import { Badge } from "@/components/ui/badge";

import type { TransactionType } from "@/types/admin/transaction.types";

interface Props {
  type: TransactionType;
}

export function TransactionTypeBadge({
  type,
}: Props) {
  return (
    <Badge variant="secondary">
      {type.replaceAll("_", " ")}
    </Badge>
  );
}