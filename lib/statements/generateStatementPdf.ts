import { PDFDocument, StandardFonts } from "pdf-lib";

import type { Account } from "@/types/account";
import type { TransactionListItem } from "@/services/transaction/getTransactions";

import { drawHeader } from "./drawHeader";
import { drawSummary } from "./drawSummary";
import { drawTransactionTable } from "./drawTransactionTable";
import { drawFooter } from "./drawFooter";

export async function generateStatementPdf(
  account: Account,
  transactions: TransactionListItem[]
) {
  const pdf = await PDFDocument.create();

  const page = pdf.addPage([612, 792]);

  const font = await pdf.embedFont(
    StandardFonts.Helvetica
  );

  const bold = await pdf.embedFont(
    StandardFonts.HelveticaBold
  );

  const closingBalance =
    transactions.length > 0
      ? transactions[0].balanceAfter
      : account.availableBalance;

  const totalCredits = transactions
    .filter(
      (transaction) =>
        transaction.direction === "CREDIT"
    )
    .reduce(
      (sum, transaction) =>
        sum + transaction.amount,
      0
    );

  const totalDebits = transactions
    .filter(
      (transaction) =>
        transaction.direction === "DEBIT"
    )
    .reduce(
      (sum, transaction) =>
        sum + transaction.amount,
      0
    );

  const openingBalance =
    closingBalance -
    totalCredits +
    totalDebits;

  const statementStart =
    transactions.length > 0
      ? new Date(
          transactions[
            transactions.length - 1
          ].postedAt
        )
      : new Date();

  const statementEnd =
    transactions.length > 0
      ? new Date(
          transactions[0].postedAt
        )
      : new Date();

  const yAfterHeader = drawHeader({
    page,
    font,
    bold,
    account,
    statementStart,
    statementEnd,
  });

  const yAfterSummary =
    drawSummary({
      page,
      font,
      bold,
      y: yAfterHeader,
      openingBalance,
      closingBalance,
      totalCredits,
      totalDebits,
    });

drawTransactionTable({
  pdf,
  page,
  font,
  bold,
  startY: yAfterSummary,
  transactions,
});
  drawFooter(page, font, 1);

  return pdf.save();
}