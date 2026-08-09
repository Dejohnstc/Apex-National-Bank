import * as XLSX from "xlsx";

import type { Statement } from "@/types/statement";

import { formatStatementData } from "./formatStatementData";

export function exportExcel(
  statements: Statement[]
) {
  const data =
    formatStatementData(statements);

  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Statements"
  );

  worksheet["!cols"] = [
    { wch: 14 },
    { wch: 40 },
    { wch: 18 },
    { wch: 24 },
    { wch: 16 },
    { wch: 16 },
    { wch: 14 },
    { wch: 18 },
    { wch: 16 },
  ];

  XLSX.writeFile(
    workbook,
    "BankStatement.xlsx"
  );
}