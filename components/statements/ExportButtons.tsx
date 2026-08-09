"use client";

import { Download, FileSpreadsheet, FileText, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ExportButtonsProps {
  onExportPdf: () => void;
  onExportCsv: () => void;
  onExportExcel: () => void;
  onPrint: () => void;
  loading?: boolean;
}

export default function ExportButtons({
  onExportPdf,
  onExportCsv,
  onExportExcel,
  onPrint,
  loading = false,
}: ExportButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={onExportPdf}
        disabled={loading}
      >
        <FileText className="mr-2 h-4 w-4" />
        PDF
      </Button>

      <Button
        variant="outline"
        onClick={onExportCsv}
        disabled={loading}
      >
        <Download className="mr-2 h-4 w-4" />
        CSV
      </Button>

      <Button
        variant="outline"
        onClick={onExportExcel}
        disabled={loading}
      >
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        Excel
      </Button>

      <Button
        variant="outline"
        onClick={onPrint}
        disabled={loading}
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
    </div>
  );
}