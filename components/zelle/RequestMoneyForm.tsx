"use client";

import { useTransition, useState } from "react";

import { createZelleRequestAction } from "@/actions/zelle/createZelleRequest";

import RecipientPreview from "./RecipientPreview";

interface Account {
  id: string;
  accountName: string;
  accountNumber: string;
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

export default function RequestMoneyForm({
  accounts,
}: Props) {
  const [pending, startTransition] =
  useTransition();

const [recipient, setRecipient] =
  useState<Recipient | null>(null);

const [message, setMessage] =
  useState("");

const [success, setSuccess] =
  useState(false);

  const [form, setForm] = useState({
    accountId: accounts[0]?.id ?? "",
    recipientEmail: "",
    amount: "",
    memo: "",
  });

  function update<
    K extends keyof typeof form
  >(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function submit() {
  setMessage("");

  if (!recipient) {
    setSuccess(false);
    setMessage(
      "Please choose a valid recipient."
    );
    return;
  }

  const amount = Number(form.amount);

  if (!amount || amount <= 0) {
    setSuccess(false);
    setMessage(
      "Enter a valid amount."
    );
    return;
  }

  startTransition(async () => {
    const result =
      await createZelleRequestAction({
        accountId: form.accountId,
        recipientEmail:
          form.recipientEmail,
        amount,
        memo: form.memo,
      });

    setSuccess(result.success);
    setMessage(result.message);

    if (!result.success) return;

    setRecipient(null);

    setForm({
      accountId: form.accountId,
      recipientEmail: "",
      amount: "",
      memo: "",
    });
  });
}

  return (
    <div className="rounded-xl border bg-white p-6 space-y-6">

      <h2 className="text-2xl font-bold">
        Request Money
      </h2>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Deposit Account
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
          min={1}
          step="0.01"
          className="w-full rounded-lg border p-3"
          placeholder="0.00"
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
          Memo
        </label>

        <textarea
          rows={3}
          className="w-full rounded-lg border p-3"
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
  className="w-full rounded-lg bg-black py-3 font-medium text-white disabled:opacity-50"
>
  {pending
    ? "Sending..."
    : "Send Request"}
</button>

    </div>
  );
}