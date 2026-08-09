import {
  PDFFont,
  PDFPage,
  rgb,
} from "pdf-lib";

export function drawFooter(
  page: PDFPage,
  font: PDFFont,
  pageNumber: number
) {
  page.drawLine({
    start: {
      x: 50,
      y: 45,
    },
    end: {
      x: 560,
      y: 45,
    },
    thickness: 0.5,
    color: rgb(0.85, 0.85, 0.85),
  });

  page.drawText(
    "Apex National Bank",
    {
      x: 50,
      y: 28,
      size: 8,
      font,
      color: rgb(0.45, 0.45, 0.45),
    }
  );

  page.drawText(
    `Generated ${new Date().toLocaleString()}`,
    {
      x: 210,
      y: 28,
      size: 8,
      font,
      color: rgb(0.45, 0.45, 0.45),
    }
  );

  page.drawText(
    `Page ${pageNumber}`,
    {
      x: 520,
      y: 28,
      size: 8,
      font,
      color: rgb(0.45, 0.45, 0.45),
    }
  );
}