"use client";

interface Props {
  open: boolean;
  onClose: () => void;

  amount: number;
  recipientName: string;
  recipientEmail: string;

  accountName: string;

  memo: string;

  reference: string;
}

export default function TransferReceipt({
  open,
  onClose,
  amount,
  recipientName,
  recipientEmail,
  accountName,
  memo,
  reference,
}: Props) {
  if (!open) return null;

  const formattedAmount = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const now = new Date();

  const date = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!open) return null;

return (
<div className="fixed inset-0 z-[999] overflow-y-auto bg-slate-950/70 backdrop-blur-md">
  <div className="flex min-h-screen items-start justify-center p-8">

    <div className="relative my-10 w-full max-w-xl rounded-[32px] bg-white shadow-[0_35px_80px_rgba(0,0,0,.35)]">

        {/* HEADER */}

        <div className="relative border-b bg-white px-10 pt-10 pb-8">

          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-violet-700" />

          <div className="flex justify-center">

            <div className="rounded-full bg-violet-50 px-6 py-2">

              <span className="text-3xl font-black tracking-tight text-violet-700">
                Zelle
              </span>

            </div>

          </div>

          <div className="mt-8 flex justify-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">

              <svg
                className="h-8 w-8 text-emerald-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </div>

          </div>

          <h1 className="mt-6 text-center text-4xl font-bold tracking-tight text-slate-900">

            Payment Sent

          </h1>

          <p className="mt-2 text-center text-sm text-slate-500">

            Your payment has been sent successfully.

          </p>

          <div className="mt-8 text-center">

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-400">

              Amount

            </p>

            <div className="mt-3 text-5xl font-black tracking-tight text-slate-900">

              ${formattedAmount}

            </div>

          </div>

        </div>

        {/* RECEIPT BODY */}

        <div className="px-10 py-8">

          <div className="overflow-hidden rounded-2xl border border-slate-200">

            <ReceiptRow
              label="Recipient Name"
              value={recipientName}
            />

            <ReceiptRow
              label="Recipient Email"
              value={recipientEmail}
            />

            <ReceiptRow
              label="From Account"
              value={`${accountName} ••••0989`}
            />

            <ReceiptRow
              label="Reference Number"
              value={reference}
            />

            {memo && (
              <ReceiptRow
                label="Memo"
                value={memo}
              />
            )}

            <ReceiptRow
              label="Date"
              value={date}
            />

            <ReceiptRow
              label="Time"
              value={time}
            />

            <ReceiptRow
              label="Status"
              value={
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                  Completed
                </span>
              }
              last
            />

          </div>

          <div className="mt-8 text-center">

            <p className="text-sm text-slate-500">

              Zelle® payments are typically available within minutes.

            </p>

            <p className="mt-1 text-sm text-slate-500">

              For questions, contact Apex National Bank.

            </p>

          {/* Footer */}

          <div className="mt-10 border-t pt-8">

            <div className="rounded-2xl bg-slate-50 p-6">

              <div className="flex items-center justify-center gap-3">

                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">

                  <svg
                    className="h-5 w-5 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M9 12l2 2 4-4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                  </svg>

                </div>

                <div>

                  <h3 className="font-bold text-slate-900">

                    Apex National Bank

                  </h3>

                  <p className="text-sm text-slate-500">

                    Secure payment processed through the Zelle® network.

                  </p>

                </div>

              </div>

            </div>

            <div className="mt-8 grid gap-3">

              <button
                onClick={() => window.print()}
                className="h-12 rounded-xl border border-slate-300 bg-white font-semibold transition hover:bg-slate-50"
              >
                Print Receipt
              </button>

              <button
                className="h-12 rounded-xl border border-violet-200 bg-violet-50 font-semibold text-violet-700 transition hover:bg-violet-100"
              >
                Download PDF
              </button>

              <button
                onClick={onClose}
                className="h-12 rounded-xl bg-violet-700 font-semibold text-white transition hover:bg-violet-800"
              >
                Done
              </button>

            </div>

            <div className="mt-8 text-center">

              <p className="text-xs text-slate-500">

                Member FDIC • Equal Housing Lender

              </p>

              <p className="mt-2 text-xs leading-6 text-slate-400">

                This receipt was electronically generated by Apex National Bank.
                Keep this receipt for your records.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
          </div>

    </div>

  );
}
function ReceiptRow({
  label,
  value,
  last,
}: {
  label: string;
  value: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-6 px-6 py-5 ${
        last ? "" : "border-b border-slate-200"
      }`}
    >
      <span className="text-sm font-medium text-slate-500">
        {label}
      </span>

      <div className="max-w-[60%] text-right text-sm font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}