"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import RecipientPreview from "./RecipientPreview";
import TransferReceipt from "./TransferReceipt";

import { createZelleTransferAction } from "@/actions/zelle/createZelleTransfer";

interface Account {
  id: string;
  accountNumber: string;
  accountName: string;
  balance: number;
}

interface Recipient {
  fullName: string;
  email: string;
  accountId: string;
  accountNumber: string;
  accountType: string;
}

interface Props {
  accounts: Account[];
}

export default function ZelleTransferForm({
  accounts,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const [recipient, setRecipient] =
    useState<Recipient | null>(null);

  const [form, setForm] = useState({
    accountId: accounts[0]?.id ?? "",
    recipientEmail: "",
    amount: "",
    memo: "",
  });

  const [receiptOpen, setReceiptOpen] =
    useState(false);

  const [receipt, setReceipt] = useState({
    amount: 0,
    recipientName: "",
    recipientEmail: "",
    accountName: "",
    memo: "",
    reference: "",
  });

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const selectedAccount = useMemo(
    () =>
      accounts.find(
        (a) => a.id === form.accountId
      ),
    [accounts, form.accountId]
  );

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function submit() {
    setMessage("");

    if (!recipient) {
      setSuccess(false);
      setMessage("Select a valid recipient.");
      return;
    }

    const amount = Number(form.amount);

    if (!amount || amount <= 0) {
      setSuccess(false);
      setMessage("Enter a valid amount.");
      return;
    }

    startTransition(async () => {
      const result =
        await createZelleTransferAction({
          accountId: form.accountId,
          recipientEmail:
            form.recipientEmail,
          amount,
          memo: form.memo,
        });

      if (!result.success) {
        setSuccess(false);
        setMessage(
          result.message ?? "Transfer failed."
        );
        return;
      }

      const account =
        accounts.find(
          (a) => a.id === form.accountId
        );

      setReceipt({
        amount,

        recipientName:
          recipient.fullName,

        recipientEmail:
          recipient.email,

        accountName:
          account?.accountName ??
          "Checking Account",

        memo: form.memo,

       reference:
  result.reference ??
  `ZL-${Date.now()}`,
      });

      setReceiptOpen(true);

      setSuccess(true);
      setMessage("");

      setForm({
        accountId: form.accountId,
        recipientEmail: "",
        amount: "",
        memo: "",
      });

      setRecipient(null);

      router.refresh();
    });
  }

  return (
    <>
      <div className="space-y-6 rounded-xl border bg-white p-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            From Account
          </label>

          <select
            className="w-full rounded-lg border p-3"
            value={form.accountId}
            onChange={(e) =>
              update(
                "accountId",
                e.target.value
              )
            }
          >
            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.accountName} ••••
                {account.accountNumber.slice(-4)}
              </option>
            ))}
          </select>

          {selectedAccount && (
            <p className="mt-2 text-sm text-gray-500">
              Available Balance: $
              {selectedAccount.balance.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Recipient Email
          </label>

          <input
            type="email"
            className="w-full rounded-lg border p-3"
            placeholder="name@example.com"
            value={form.recipientEmail}
            onChange={(e) =>
              update(
                "recipientEmail",
                e.target.value
              )
            }
          />
        </div>

        <RecipientPreview
          email={form.recipientEmail}
          onRecipientFound={
            setRecipient
          }
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Amount
          </label>

          <input
            type="number"
            className="w-full rounded-lg border p-3"
            placeholder="0.00"
            min={1}
            step="0.01"
            value={form.amount}
            onChange={(e) =>
              update(
                "amount",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Memo (Optional)
          </label>

          <textarea
            rows={3}
            className="w-full rounded-lg border p-3"
            placeholder="What's this payment for?"
            value={form.memo}
            onChange={(e) =>
              update(
                "memo",
                e.target.value
              )
            }
          />
        </div>

        {message && (
          <div
            className={`rounded-lg p-3 text-sm ${
              success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <button
          disabled={pending}
          onClick={submit}
          className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-black/90 disabled:opacity-50"
        >
          {pending
            ? "Sending..."
            : "Send Money"}
        </button>
      </div>

      <TransferReceipt
        open={receiptOpen}
        onClose={() =>
          setReceiptOpen(false)
        }
        amount={receipt.amount}
        recipientName={
          receipt.recipientName
        }
        recipientEmail={
          receipt.recipientEmail
        }
        accountName={
          receipt.accountName
        }
        memo={receipt.memo}
        reference={
          receipt.reference
        }
      />
    </>
  );
}