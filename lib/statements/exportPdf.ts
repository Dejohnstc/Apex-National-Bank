import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { Statement } from "@/types/statement";

interface StatementInfo {
  bankName: string;
  customerName: string;
  accountNumber: string;
  statementPeriod: string;
}

function money(
  amount: number,
  currency: string
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function exportPdf(
  statements: Statement[],
  info?: Partial<StatementInfo>
) {
  const pdf = new jsPDF();

  const bankName =
    info?.bankName ??
    "APEX NATIONAL BANK";

  const customerName =
    info?.customerName ??
    "Customer";

  const accountNumber =
    info?.accountNumber ??
    "************";

  const statementPeriod =
    info?.statementPeriod ??
    "Current Statement";

  const openingBalance =
    statements.length
      ? statements[
          statements.length - 1
        ].balanceBefore
      : 0;

  const closingBalance =
    statements.length
      ? statements[0]
          .balanceAfter
      : 0;

  const totalCredits =
    statements
      .filter(
        (t) =>
          t.direction === "IN"
      )
      .reduce(
        (sum, t) =>
          sum + t.amount,
        0
      );

  const totalDebits =
    statements
      .filter(
        (t) =>
          t.direction ===
          "OUT"
      )
      .reduce(
        (sum, t) =>
          sum + t.amount,
        0
      );

  pdf.setFontSize(20);

  pdf.text(
    bankName,
    105,
    18,
    {
      align: "center",
    }
  );

  pdf.setFontSize(10);

  pdf.text(
    "Official Account Statement",
    105,
    24,
    {
      align: "center",
    }
  );

  pdf.line(
    14,
    30,
    196,
    30
  );

  pdf.setFontSize(11);

  pdf.text(
    `Customer: ${customerName}`,
    14,
    40
  );

  pdf.text(
    `Account: ${accountNumber}`,
    14,
    47
  );

  pdf.text(
    `Statement Period: ${statementPeriod}`,
    14,
    54
  );

  pdf.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    61
  );

  pdf.roundedRect(
    14,
    68,
    182,
    26,
    2,
    2
  );

  pdf.setFontSize(10);

  pdf.text(
    `Opening Balance: ${money(
      openingBalance,
      "USD"
    )}`,
    18,
    78
  );

  pdf.text(
    `Closing Balance: ${money(
      closingBalance,
      "USD"
    )}`,
    18,
    86
  );

  pdf.text(
    `Total Credits: ${money(
      totalCredits,
      "USD"
    )}`,
    110,
    78
  );

  pdf.text(
    `Total Debits: ${money(
      totalDebits,
      "USD"
    )}`,
    110,
    86
  );

  autoTable(pdf, {
    startY: 102,

    head: [[
      "Date",
      "Description",
      "Category",
      "Debit",
      "Credit",
      "Balance",
    ]],

    body: statements.map(
      (t) => [
        new Date(
          t.postedAt
        ).toLocaleDateString(),

        t.description,

        t.category || "-",

        t.direction ===
        "OUT"
          ? money(
              t.amount,
              t.currency
            )
          : "",

        t.direction ===
        "IN"
          ? money(
              t.amount,
              t.currency
            )
          : "",

        money(
          t.balanceAfter,
          t.currency
        ),
      ]
    ),

    theme: "grid",

    styles: {
      fontSize: 8,
      cellPadding: 2,
    },

    headStyles: {
      fillColor: [
        23,
        37,
        84,
      ],
      textColor: 255,
    },

    alternateRowStyles: {
      fillColor: [
        248,
        250,
        252,
      ],
    },
  });

  const pageCount =
    pdf.getNumberOfPages();

  for (
    let i = 1;
    i <= pageCount;
    i++
  ) {
    pdf.setPage(i);

    pdf.setFontSize(9);

    pdf.text(
      `Page ${i} of ${pageCount}`,
      105,
      290,
      {
        align: "center",
      }
    );

    pdf.text(
      "© Apex National Bank",
      14,
      290
    );
  }

  pdf.save(
    "AccountStatement.pdf"
  );
}