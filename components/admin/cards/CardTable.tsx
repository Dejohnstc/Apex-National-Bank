import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { AdminCard } from "@/services/admin/cards";

import { CardStatusBadge } from "./CardStatusBadge";
import { CardTypeBadge } from "./CardTypeBadge";
import { CardRowActions } from "./CardRowActions";

interface Props {
  cards: AdminCard[];
}

export function CardTable({
  cards,
}: Props) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Holder</TableHead>

            <TableHead>Card</TableHead>

            <TableHead>Network</TableHead>

            <TableHead>Type</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Virtual</TableHead>

            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {cards.map((card) => (
            <TableRow key={card.id}>
              <TableCell>
                {card.holderName}
              </TableCell>

              <TableCell>
                •••• {card.last4}
              </TableCell>

              <TableCell>
                {card.network}
              </TableCell>

              <TableCell>
                <CardTypeBadge
                  type={card.type}
                />
              </TableCell>

              <TableCell>
                <CardStatusBadge
                  status={card.status}
                />
              </TableCell>

              <TableCell>
                {card.virtual
                  ? "Yes"
                  : "No"}
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/cards/${card.id}`}
                    className="font-medium text-primary"
                  >
                    View
                  </Link>

                  <CardRowActions
                    id={card.id}
                    status={card.status}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}