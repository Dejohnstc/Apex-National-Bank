"use client";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Statement } from "@/types/statement";

interface StatementTableProps {
  statements: Statement[];
  loading?: boolean;
}

function formatCurrency(
  amount: number,
  currency: string
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export default function StatementTable({
  statements,
  loading = false,
}: StatementTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border p-10 text-center text-muted-foreground">
        Loading statements...
      </div>
    );
  }

  if (statements.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-muted-foreground">
        No statements found.
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">
              Debit
            </TableHead>
            <TableHead className="text-right">
              Credit
            </TableHead>
            <TableHead className="text-right">
              Fee
            </TableHead>
            <TableHead className="text-right">
              Balance
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {statements.map((statement) => (
            <TableRow key={statement._id}>
              <TableCell>
                {new Date(
                  statement.postedAt
                ).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">
                    {statement.description}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {statement.reference}
                  </div>

                  {statement.merchant && (
                    <div className="text-xs text-muted-foreground">
                      {statement.merchant}
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell>
                {statement.category || "-"}
              </TableCell>

              <TableCell className="text-right">
                {statement.direction ===
                "OUT"
                  ? formatCurrency(
                      statement.amount,
                      statement.currency
                    )
                  : "-"}
              </TableCell>

              <TableCell className="text-right">
                {statement.direction ===
                "IN"
                  ? formatCurrency(
                      statement.amount,
                      statement.currency
                    )
                  : "-"}
              </TableCell>

              <TableCell className="text-right">
                {statement.fee > 0
                  ? formatCurrency(
                      statement.fee,
                      statement.currency
                    )
                  : "-"}
              </TableCell>

              <TableCell className="text-right font-semibold">
                {formatCurrency(
                  statement.balanceAfter,
                  statement.currency
                )}
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    statement.status ===
                    "COMPLETED"
                      ? "default"
                      : statement.status ===
                        "FAILED"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {statement.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}