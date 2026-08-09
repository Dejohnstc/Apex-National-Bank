"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  type: "DOMESTIC" | "INTERNATIONAL";

  recipientName: string;
  setRecipientName: (value: string) => void;

  bankName: string;
  setBankName: (value: string) => void;

  accountNumber: string;
  setAccountNumber: (value: string) => void;

  routingNumber: string;
  setRoutingNumber: (value: string) => void;

  swiftCode: string;
  setSwiftCode: (value: string) => void;

  country: string;
  setCountry: (value: string) => void;

  amount: string;
  setAmount: (value: string) => void;

  purpose: string;
  setPurpose: (value: string) => void;
}

export default function WireRecipientForm({
  type,

  recipientName,
  setRecipientName,

  bankName,
  setBankName,

  accountNumber,
  setAccountNumber,

  routingNumber,
  setRoutingNumber,

  swiftCode,
  setSwiftCode,

  country,
  setCountry,

  amount,
  setAmount,

  purpose,
  setPurpose,
}: Props) {
  return (
    <div className="space-y-6">

      {/* Recipient */}

      <section className="rounded-2xl border bg-white p-5 shadow-sm">

        <div className="mb-5">

          <h2 className="text-lg font-bold text-slate-900">
            Recipient Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter beneficiary banking details.
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <Field label="Recipient Name">

            <Input
              className="h-10"
              placeholder="John Smith"
              value={recipientName}
              onChange={(e) =>
                setRecipientName(e.target.value)
              }
            />

          </Field>

          <Field label="Receiving Bank">

            <Input
              className="h-10"
              placeholder="Bank Name"
              value={bankName}
              onChange={(e) =>
                setBankName(e.target.value)
              }
            />

          </Field>

          <Field label="Account Number">

            <Input
              className="h-10"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value)
              }
            />

          </Field>

          {type === "DOMESTIC" ? (

            <Field label="Routing Number">

              <Input
                className="h-10"
                placeholder="Routing Number"
                value={routingNumber}
                onChange={(e) =>
                  setRoutingNumber(e.target.value)
                }
              />

            </Field>

          ) : (

            <>
              <Field label="SWIFT / BIC">

                <Input
                  className="h-10"
                  placeholder="SWIFT Code"
                  value={swiftCode}
                  onChange={(e) =>
                    setSwiftCode(e.target.value)
                  }
                />

              </Field>

              <Field label="Destination Country">

                <Input
                  className="h-10"
                  placeholder="Country"
                  value={country}
                  onChange={(e) =>
                    setCountry(e.target.value)
                  }
                />

              </Field>
            </>

          )}

        </div>

      </section>

      {/* Transfer */}

      <section className="rounded-2xl border bg-white p-5 shadow-sm">

        <div className="mb-5">

          <h2 className="text-lg font-bold text-slate-900">
            Transfer Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Amount and payment purpose.
          </p>

        </div>

        <div className="space-y-4">

          <Field label="Transfer Amount (USD)">

            <Input
              type="number"
              className="h-10 text-base font-semibold"
              placeholder="0.00"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />

          </Field>

          <Field label="Purpose">

            <Textarea
              rows={3}
              placeholder="Optional description..."
              className="resize-none"
              value={purpose}
              onChange={(e) =>
                setPurpose(e.target.value)
              }
            />

          </Field>

        </div>

      </section>

    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">

      <Label className="text-sm font-medium text-slate-700">
        {label}
      </Label>

      {children}

    </div>
  );
}