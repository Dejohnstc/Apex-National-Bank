"use client";

import {
  Download,
  Printer,
  Mail,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  onPrint?: () => void;
  onDownload?: () => void;
  onEmail?: () => void;
  onBack?: () => void;

  loading?: boolean;
}

export function ReceiptActions({
  onPrint,
  onDownload,
  onEmail,
  onBack,
  loading = false,
}: Props) {
  return (
    <div className="print:hidden">

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between rounded-2xl border bg-slate-50 p-4 shadow-sm">

        {/* Left */}

        <Button
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Right */}

        <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">

          <Button
            variant="outline"
            onClick={onPrint}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>

          <Button
            variant="outline"
            onClick={onDownload}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>

          <Button
            onClick={onEmail}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Receipt
          </Button>

        </div>

      </div>

    </div>
  );
}