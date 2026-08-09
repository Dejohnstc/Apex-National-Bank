import Link from "next/link";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import type { AdminTransfer } from "@/services/admin/transfers/types";
import { TransferStatusBadge } from "./TransferStatusBadge";
import { TransferTypeBadge } from "./TransferTypeBadge";
import { TransferRowActions } from "./TransferRowActions";

interface Props {
  transfers: AdminTransfer[];
}

export function TransferTable({
  transfers,
}: Props) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Customer
            </TableHead>

            <TableHead>
              Recipient
            </TableHead>

            <TableHead>
              Type
            </TableHead>

            <TableHead>
              Amount
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {transfers.map(
            (transfer) => (
              <TableRow
                key={transfer.id}
              >
                <TableCell>
                  {
                    transfer.customerName
                  }
                </TableCell>

                <TableCell>
                  {
                    transfer.recipientName
                  }
                </TableCell>

                <TableCell>
                  <TransferTypeBadge
                    type={
                      transfer.type
                    }
                  />
                </TableCell>

                <TableCell>
                  {transfer.amount.toLocaleString(
                    "en-US",
                    {
                      style:
                        "currency",
                      currency:
                        transfer.currency,
                    }
                  )}
                </TableCell>

                <TableCell>
                  <TransferStatusBadge
                    status={
                      transfer.status
                    }
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/transfers/${transfer.id}`}
                      className="font-medium text-primary"
                    >
                      View
                    </Link>

                   <TransferRowActions
    id={transfer.id}
    type={transfer.type}
    status={transfer.status}
/>
                  </div>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}