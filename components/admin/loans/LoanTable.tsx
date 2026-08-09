import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { AdminLoan } from "@/services/admin/loans";

import { LoanStatusBadge } from "./LoanStatusBadge";
import { LoanTypeBadge } from "./LoanTypeBadge";
import { LoanRowActions } from "./LoanRowActions";

interface Props {
  loans: AdminLoan[];
}

export function LoanTable({
  loans,
}: Props) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loan #</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Principal</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>
                {loan.loanNumber}
              </TableCell>

              <TableCell>
                <LoanTypeBadge
                  type={loan.type}
                />
              </TableCell>

              <TableCell>
                <LoanStatusBadge
                  status={loan.status}
                />
              </TableCell>

              <TableCell>
                $
                {loan.principal.toLocaleString()}
              </TableCell>

              <TableCell>
                $
                {loan.remainingBalance.toLocaleString()}
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/loans/${loan.id}`}
                    className="font-medium text-primary"
                  >
                    View
                  </Link>

                  <LoanRowActions
                    id={loan.id}
                    status={loan.status}
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