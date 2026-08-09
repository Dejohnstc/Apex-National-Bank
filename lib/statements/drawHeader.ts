import {
  PDFFont,
  PDFPage,
  rgb,
} from "pdf-lib";

import type { Account } from "@/types/account";

import { formatLongDate } from "./formatters";

interface Props {
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  account: Account;
  statementStart: Date;
  statementEnd: Date;
}

export function drawHeader({
  page,
  font,
  bold,
  account,
  statementStart,
  statementEnd,
}: Props) {
  let y = 747;

  page.drawText("APEX NATIONAL BANK", {
    x: 50,
    y,
    size: 24,
    font: bold,
    color: rgb(0.06, 0.45, 0.36),
  });

  y -= 28;

  page.drawText(
    "Official Account Statement",
    {
      x: 50,
      y,
      size: 14,
      font,
    }
  );

  y -= 24;

  page.drawText(
    `Statement Period: ${formatLongDate(
      statementStart
    )} - ${formatLongDate(
      statementEnd
    )}`,
    {
      x: 50,
      y,
      size: 11,
      font,
    }
  );

  y -= 28;

  page.drawText(
    `Account: ${account.nickname}`,
    {
      x: 50,
      y,
      size: 11,
      font,
    }
  );

  page.drawText(
    `****${account.accountNumber.slice(
      -4
    )}`,
    {
      x: 430,
      y,
      size: 11,
      font,
    }
  );

  return y - 30;
}