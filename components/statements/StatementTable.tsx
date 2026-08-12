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
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export default function StatementTable({
  statements,
  loading = false,
}: StatementTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border bg-card p-10 text-center text-muted-foreground">
        <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
        Loading statements...
      </div>
    );
  }

  if (statements.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-10 text-center">
        <p className="font-medium text-foreground">
          No statements found.
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Try changing your search or date filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>

            <TableHead>
              Description
            </TableHead>

            <TableHead>
              Category
            </TableHead>

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

            <TableHead>
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {statements.map((statement) => (
            <TableRow
              key={statement._id}
            >
              {/* Date */}
              <TableCell className="whitespace-nowrap">
                {formatDate(
                  statement.postedAt
                )}
              </TableCell>

              {/* Description */}
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

              {/* Category */}
              <TableCell>
                {statement.category || "-"}
              </TableCell>

              {/* Debit */}
              <TableCell className="text-right">
                {statement.direction ===
                "OUT"
                  ? formatCurrency(
                      statement.amount,
                      statement.currency
                    )
                  : "-"}
              </TableCell>

              {/* Credit */}
              <TableCell className="text-right">
                {statement.direction ===
                "IN"
                  ? formatCurrency(
                      statement.amount,
                      statement.currency
                    )
                  : "-"}
              </TableCell>

              {/* Fee */}
              <TableCell className="text-right">
                {statement.fee > 0
                  ? formatCurrency(
                      statement.fee,
                      statement.currency
                    )
                  : "-"}
              </TableCell>

              {/* Balance */}
              <TableCell className="text-right font-semibold">
                {formatCurrency(
                  statement.balanceAfter,
                  statement.currency
                )}
              </TableCell>

              {/* Status */}
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