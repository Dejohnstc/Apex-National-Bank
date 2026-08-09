import {
  PDFDocument,
  PDFFont,
  PDFPage,
  rgb,
} from "pdf-lib";

import type { TransactionListItem } from "@/services/transaction/getTransactions";

import {
  formatMoney,
  formatShortDate,
  truncate,
} from "./formatters";

import { drawFooter } from "./drawFooter";

interface DrawTransactionTableProps {
  pdf: PDFDocument;
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  startY: number;
  transactions: TransactionListItem[];
}

export function drawTransactionTable({
  pdf,
  page,
  font,
  bold,
  startY,
  transactions,
}: DrawTransactionTableProps) {
  let currentPage = page;
  let y = startY;
  let pageNumber = 1;

  const drawHeaderRow = () => {
    currentPage.drawRectangle({
      x: 50,
      y: y - 18,
      width: 512,
      height: 18,
      color: rgb(0.94, 0.97, 0.99),
    });

    currentPage.drawText("Date", {
      x: 55,
      y: y - 13,
      size: 9,
      font: bold,
    });

    currentPage.drawText("Description", {
      x: 120,
      y: y - 13,
      size: 9,
      font: bold,
    });

    currentPage.drawText("Debit", {
      x: 345,
      y: y - 13,
      size: 9,
      font: bold,
    });

    currentPage.drawText("Credit", {
      x: 425,
      y: y - 13,
      size: 9,
      font: bold,
    });

    currentPage.drawText("Balance", {
      x: 500,
      y: y - 13,
      size: 9,
      font: bold,
    });

    y -= 30;
  };

  drawHeaderRow();

  transactions.forEach((transaction, index) => {
    if (y < 70) {
      drawFooter(
        currentPage,
        font,
        pageNumber
      );

      currentPage = pdf.addPage([
        612,
        792,
      ]);

      pageNumber++;

      y = 740;

      drawHeaderRow();
    }

    if (index % 2 === 0) {
      currentPage.drawRectangle({
        x: 50,
        y: y - 4,
        width: 512,
        height: 16,
        color: rgb(
          0.985,
          0.985,
          0.985
        ),
      });
    }

    currentPage.drawText(
      formatShortDate(
        transaction.postedAt
      ),
      {
        x: 55,
        y,
        size: 8,
        font,
      }
    );

    currentPage.drawText(
      truncate(
        transaction.description,
        34
      ),
      {
        x: 120,
        y,
        size: 8,
        font,
      }
    );

    if (
      transaction.direction ===
      "DEBIT"
    ) {
      currentPage.drawText(
        formatMoney(
          transaction.amount
        ),
        {
          x: 345,
          y,
          size: 8,
          font,
          color: rgb(0.8, 0, 0),
        }
      );
    } else {
      currentPage.drawText(
        formatMoney(
          transaction.amount
        ),
        {
          x: 425,
          y,
          size: 8,
          font,
          color: rgb(0, 0.5, 0),
        }
      );
    }

    currentPage.drawText(
      formatMoney(
        transaction.balanceAfter
      ),
      {
        x: 495,
        y,
        size: 8,
        font,
      }
    );

    y -= 18;
  });

  drawFooter(
    currentPage,
    font,
    pageNumber
  );
}