import type { Statement } from "@/types/statement";
import { formatStatementData } from "./formatStatementData";

export function exportCsv(
  statements: Statement[]
) {
  const rows =
    formatStatementData(statements);

  const headers = [
    "Date",
    "Description",
    "Category",
    "Reference",
    "Debit",
    "Credit",
    "Fee",
    "Balance",
    "Status",
  ];

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      [
        row.date,
        `"${row.description}"`,
        `"${row.category}"`,
        row.reference,
        row.debit,
        row.credit,
        row.fee,
        row.balance,
        row.status,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv",
  });

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "statement.csv";

  link.click();

  URL.revokeObjectURL(url);
}