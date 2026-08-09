import { Badge } from "@/components/ui/badge";

interface Props {
  status: "ACTIVE" | "FROZEN" | "CLOSED";
}

const variants = {
  ACTIVE:
    "bg-green-100 text-green-700 border-green-200",

  FROZEN:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  CLOSED:
    "bg-red-100 text-red-700 border-red-200",
};

export function AccountStatusBadge({
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