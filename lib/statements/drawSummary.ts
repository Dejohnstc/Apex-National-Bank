import {
  PDFFont,
  PDFPage,
  rgb,
} from "pdf-lib";

import { formatMoney } from "./formatters";

interface DrawSummaryProps {
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  y: number;

  openingBalance: number;
  closingBalance: number;
  totalCredits: number;
  totalDebits: number;
}

export function drawSummary({
  page,
  font,
  bold,
  y,
  openingBalance,
  closingBalance,
  totalCredits,
  totalDebits,
}: DrawSummaryProps) {
  const left = 50;
  const width = 512;
  const height = 70;

  page.drawRectangle({
    x: left,
    y: y - height,
    width,
    height,
    borderWidth: 1,
    borderColor: rgb(0.84, 0.84, 0.84),
  });

  const columns = [
    {
      title: "Opening",
      value: formatMoney(openingBalance),
    },
    {
      title: "Credits",
      value: formatMoney(totalCredits),
    },
    {
      title: "Debits",
      value: formatMoney(totalDebits),
    },
    {
      title: "Closing",
      value: formatMoney(closingBalance),
    },
  ];

  const columnWidth = width / 4;

  columns.forEach((column, index) => {
    const x = left + index * columnWidth + 12;

    page.drawText(column.title, {
      x,
      y: y - 22,
      size: 10,
      font,
      color: rgb(0.45, 0.45, 0.45),
    });

    page.drawText(column.value, {
      x,
      y: y - 42,
      size: 12,
      font: bold,
      color: rgb(0.06, 0.45, 0.36),
    });

    if (index !== columns.length - 1) {
      page.drawLine({
        start: {
          x: left + (index + 1) * columnWidth,
          y,
        },
        end: {
          x: left + (index + 1) * columnWidth,
          y: y - height,
        },
        thickness: 0.5,
        color: rgb(0.86, 0.86, 0.86),
      });
    }
  });

  return y - height - 25;
}