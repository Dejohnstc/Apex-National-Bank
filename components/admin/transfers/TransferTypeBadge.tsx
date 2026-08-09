import { Badge } from "@/components/ui/badge";

interface Props {
  type: string;
}

export function TransferTypeBadge({
  type,
}: Props) {
  return (
    <Badge variant="secondary">
      {type}
    </Badge>
  );
}