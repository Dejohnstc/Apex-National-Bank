import { Badge } from "@/components/ui/badge";

import type { CardStatus } from "@/services/admin/cards";

interface Props {
  status: CardStatus;
}

const variants: Record<CardStatus, string> = {
  ACTIVE:
    "bg-green-100 text-green-700 border-green-200",

  FROZEN:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  BLOCKED:
    "bg-red-100 text-red-700 border-red-200",

  EXPIRED:
    "bg-gray-100 text-gray-700 border-gray-200",
};

export function CardStatusBadge({
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