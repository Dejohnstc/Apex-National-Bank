import { Badge } from "@/components/ui/badge";

import type { CardType } from "@/services/admin/cards";

interface Props {
  type: CardType;
}

export function CardTypeBadge({
  type,
}: Props) {
  return (
    <Badge variant="secondary">
      {type}
    </Badge>
  );
}