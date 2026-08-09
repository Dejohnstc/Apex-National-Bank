"use client";

import {
  useMemo,
  useState,
} from "react";

import type { Account } from "@/types/account";
import type { TransactionListItem } from "@/services/transaction/getTransactions";
import { TransactionExport } from "./TransactionExport";
import { AccountSwitcher } from "./AccountSwitcher";
import { TransactionAnalytics } from "./TransactionAnalytics";
import { TransactionPagination } from "./TransactionPagination";
import { TransactionSummary } from "./TransactionSummary";
import { TransactionTable } from "./TransactionTable";
import { TransactionToolbar } from "./TransactionToolbar";
import { exportTransactionsCsv } from "@/lib/export/exportTransactionsCsv";
import { generateStatementPdf } from "@/lib/statements/generateStatementPdf";

interface TransactionsViewProps {
  accounts: Account[];
  account: Account;
  transactions: TransactionListItem[];
}

export function TransactionsView({
  accounts,
  account,
  transactions,
}: TransactionsViewProps) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;


  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        !search ||
        transaction.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.reference
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (transaction.counterpartyName ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        type === "ALL" ||
        transaction.type === type;

      const matchesStatus =
        status === "ALL" ||
        transaction.status === status;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    transactions,
    search,
    type,
    status,
  ]);
function handleExportCsv() {
  exportTransactionsCsv(
    filteredTransactions,
    account.nickname
  );
}

async function handleExportPdf() {
  try {
    const bytes =
      await generateStatementPdf(
        account,
        filteredTransactions
      );

   const arrayBuffer = bytes.buffer.slice(
  bytes.byteOffset,
  bytes.byteOffset + bytes.byteLength
) as ArrayBuffer;

const blob = new Blob([arrayBuffer], {
  type: "application/pdf",
});

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `${account.nickname.replace(
      /\s+/g,
      "_"
    )}_Statement.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
}
  const totalPages = Math.max(
  1,
  Math.ceil(
    filteredTransactions.length / PAGE_SIZE
  )
);

const currentPage = Math.min(
  page,
  totalPages
);

const paginatedTransactions =
  filteredTransactions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      <AccountSwitcher
        accounts={accounts}
        selectedId={account._id}
      />

      <TransactionAnalytics
        transactions={filteredTransactions}
      />

      <TransactionSummary
        transactions={filteredTransactions}
      />

      <TransactionToolbar
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={(value) =>
          setType(value ?? "ALL")
        }
        status={status}
        onStatusChange={(value) =>
          setStatus(value ?? "ALL")
        }
      />
<TransactionExport
  onExportCsv={handleExportCsv}
  onExportPdf={handleExportPdf}
/>
      <TransactionTable
        account={account}
        transactions={
          paginatedTransactions
        }
      />

      <TransactionPagination
  page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}