import { Badge } from "@/components/ui/badge";

interface Props {
  type:
    | "CHECKING"
    | "SAVINGS"
    | "BUSINESS";
}

const variants = {
  CHECKING:
    "bg-blue-100 text-blue-700 border-blue-200",

  SAVINGS:
    "bg-purple-100 text-purple-700 border-purple-200",

  BUSINESS:
    "bg-orange-100 text-orange-700 border-orange-200",
};

export function AccountTypeBadge({
  type,
}: Props) {
  return (
    <Badge
      variant="outline"
      className={variants[type]}
    >
      {type}
    </Badge>
  );
}