import { saveAs } from "file-saver";

import type { TransactionListItem } from "@/services/transaction/getTransactions";

export function exportTransactionsCsv(
  transactions: TransactionListItem[],
  accountName: string
) {
  const rows = [
    [
      "Date",
      "Reference",
      "Description",
      "Type",
      "Status",
      "Debit",
      "Credit",
      "Balance",
    ],
  ];

  for (const transaction of transactions) {
    rows.push([
      new Date(
        transaction.postedAt
      ).toLocaleDateString("en-US"),

      transaction.reference,

      transaction.description,

      transaction.type,

      transaction.status,

      transaction.direction === "DEBIT"
        ? transaction.amount.toFixed(2)
        : "",

      transaction.direction === "CREDIT"
        ? transaction.amount.toFixed(2)
        : "",

      transaction.balanceAfter.toFixed(2),
    ]);
  }

  const csv = rows
    .map((row) =>
      row
        .map((value) => `"${value}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(
    blob,
    `${accountName.replace(/\s+/g, "_")}_Transactions.csv`
  );
}