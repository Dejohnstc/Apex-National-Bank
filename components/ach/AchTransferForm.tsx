"use client";

import {
  useState,
  useTransition,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";

import { createAchTransferAction } from "@/actions/ach/createAchTransferAction";

type AccountOption = {
  _id: string;
  nickname: string;
  accountNumber: string;
  availableBalance: number;
  type: string;
};

interface ExternalAccount {
  _id: string;
  nickname: string;
  accountHolderName: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: "CHECKING" | "SAVINGS";
  isDefault?: boolean;
}

interface Props {
  accounts: AccountOption[];
  externalAccounts: ExternalAccount[];
}

export default function AchTransferForm({
  accounts,
  externalAccounts,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();
const [selectedExternalAccount, setSelectedExternalAccount] =
  useState("");
  const [form, setForm] = useState({
    accountId: "",
    recipientName: "",
    recipientBank: "",
    routingNumber: "",
    accountNumber: "",
    accountType: "CHECKING" as
      | "CHECKING"
      | "SAVINGS",
    amount: "",
    memo: "",
  });

 function handleChange(
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]:
      name === "accountType"
        ? (value as "CHECKING" | "SAVINGS")
        : value,
  }));
}

  async function handleSubmit(
  e: FormEvent<HTMLFormElement>
) {
    e.preventDefault();

    startTransition(async () => {
      const result =
        await createAchTransferAction({
          accountId: form.accountId,
          recipientName:
            form.recipientName.trim(),
          recipientBank:
            form.recipientBank.trim(),
          routingNumber:
            form.routingNumber.trim(),
          accountNumber:
            form.accountNumber.trim(),
          accountType:
            form.accountType,
          amount: Number(form.amount),
          memo: form.memo.trim(),
        });

      if (!result.success) {
        alert(result.error);
        return;
      }

      router.push(
        `/dashboard/ach/${result.reference}`
      );
    });
  }

  return (
    <form
  autoComplete="off"
  onSubmit={handleSubmit}
  className="rounded-xl border p-6 space-y-6"
>
      <div>
        <label className="mb-2 block text-sm font-medium">
          From Account
        </label>

        <select
          name="accountId"
          value={form.accountId}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
          required
        >
          <option value="">
            Select an account
          </option>

          {accounts.map((account) => (
            <option
              key={account._id}
              value={account._id}
            >
              {account.nickname} ••••
              {account.accountNumber.slice(-4)} (
              $
              {Number(
                account.availableBalance
              ).toLocaleString()}
              )
            </option>
          ))}
        </select>
      </div>
<div>
  <label className="mb-2 block text-sm font-medium">
    Saved External Account
  </label>

  <select
    value={selectedExternalAccount}
   onChange={(e) => {
  const id = e.target.value;

  setSelectedExternalAccount(id);

  if (!id) {
    setForm((prev) => ({
      ...prev,
      recipientName: "",
      recipientBank: "",
      routingNumber: "",
      accountNumber: "",
      accountType: "CHECKING",
    }));

    return;
  }

  const account = externalAccounts.find(
    (a) => a._id === id
  );

  if (!account) return;

  setForm((prev) => ({
    ...prev,
    recipientName: account.accountHolderName,
    recipientBank: account.bankName,
    routingNumber: account.routingNumber,
    accountNumber: account.accountNumber,
    accountType: account.accountType,
  }));
}}
    className="w-full rounded-md border px-3 py-2"
  >
    <option value="">
      Enter New Account
    </option>

    {externalAccounts.map((account) => (
      <option
        key={account._id}
        value={account._id}
      >
        {account.nickname}
        {account.isDefault ? " (Default)" : ""}
      </option>
    ))}
  </select>
</div>
      <div>
        <label className="mb-2 block text-sm font-medium">
          Recipient Name
        </label>

        <input
          type="text"
          name="recipientName"
          value={form.recipientName}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Bank Name
        </label>

        <input
          type="text"
          name="recipientBank"
          value={form.recipientBank}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Routing Number
          </label>

         <input
  type="text"
  inputMode="numeric"
  autoComplete="off"
  spellCheck={false}
  name="routingNumber"
  value={form.routingNumber}
  onChange={handleChange}
  maxLength={9}
  className="w-full rounded-md border px-3 py-2"
  required
/>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Account Number
          </label>

          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Account Type
          </label>

          <select
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="CHECKING">
              Checking
            </option>

            <option value="SAVINGS">
              Savings
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Amount
          </label>

          <input
            type="number"
            step="0.01"
            min="0.01"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Memo (Optional)
        </label>

        <input
          type="text"
          name="memo"
          value={form.memo}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending
          ? "Processing..."
          : "Continue"}
      </button>
    </form>
  );
}