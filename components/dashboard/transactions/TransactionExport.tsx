"use client";

import { Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TransactionExportProps {
  onExportCsv: () => void;
  onExportPdf: () => void;
}

export function TransactionExport({
  onExportCsv,
  onExportPdf,
}: TransactionExportProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <Button
        variant="outline"
        onClick={onExportCsv}
      >
        <Download className="mr-2 h-4 w-4" />
        Export CSV
      </Button>

      <Button onClick={onExportPdf}>
        <FileText className="mr-2 h-4 w-4" />
        Download Statement
      </Button>
    </div>
  );
}