"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { createExternalAccountAction } from "@/actions/externalAccounts/createExternalAccountAction";

export default function ExternalAccountForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState<{
  nickname: string;
  accountHolderName: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: "CHECKING" | "SAVINGS";
}>({
  nickname: "",
  accountHolderName: "",
  bankName: "",
  routingNumber: "",
  accountNumber: "",
  accountType: "CHECKING",
});

  async function submit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const result =
      await createExternalAccountAction(
        form
      );

    setLoading(false);

    if (!result.success) {
      alert(result.error);
      return;
    }

    router.push(
      "/dashboard/ach/external-accounts"
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5 max-w-xl"
    >
      {[
        ["nickname", "Nickname"],
        [
          "accountHolderName",
          "Account Holder",
        ],
        ["bankName", "Bank Name"],
        [
          "routingNumber",
          "Routing Number",
        ],
        [
          "accountNumber",
          "Account Number",
        ],
      ].map(([key, label]) => (
        <div key={key}>
          <label className="block text-sm mb-2">
            {label}
          </label>

          <input
            className="w-full rounded border px-3 py-2"
            value={
              form[
                key as keyof typeof form
              ] as string
            }
            onChange={(e) =>
              setForm({
                ...form,
                [key]: e.target.value,
              })
            }
          />
        </div>
      ))}

      <div>
        <label className="block text-sm mb-2">
          Account Type
        </label>

        <select
  className="w-full rounded border px-3 py-2"
  value={form.accountType}
  onChange={(e) =>
    setForm({
      ...form,
      accountType: e.target.value as
        | "CHECKING"
        | "SAVINGS",
    })
  }
>
  <option value="CHECKING">Checking</option>
  <option value="SAVINGS">Savings</option>
</select>
      </div>

      <Button disabled={loading}>
        {loading
          ? "Saving..."
          : "Save External Account"}
      </Button>
    </form>
  );
}