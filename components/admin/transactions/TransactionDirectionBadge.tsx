import { Badge } from "@/components/ui/badge";

import type { TransactionDirection } from "@/types/admin/transaction.types";

interface Props {
  direction: TransactionDirection;
}

export function TransactionDirectionBadge({
  direction,
}: Props) {
  return (
    <Badge
      variant={
        direction === "CREDIT"
          ? "default"
          : "destructive"
      }
    >
      {direction}
    </Badge>
  );
}