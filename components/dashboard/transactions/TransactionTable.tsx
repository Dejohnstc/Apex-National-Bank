import type { Account } from "@/types/account";
import type { TransactionListItem } from "@/services/transaction/getTransactions";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TransactionEmpty } from "./TransactionEmpty";
import { TransactionRow } from "./TransactionRow";

interface TransactionTableProps {
  account: Account;
  transactions: TransactionListItem[];
}

export function TransactionTable({
  transactions,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return <TransactionEmpty />;
  }

  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Amount
            </TableHead>
            <TableHead className="text-right">
              Balance
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction._id}
              transaction={transaction}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}