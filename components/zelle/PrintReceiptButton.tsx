"use client";

export default function PrintReceiptButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex-1 rounded-lg border py-3 font-medium transition hover:bg-slate-50"
    >
      Print Receipt
    </button>
  );
}