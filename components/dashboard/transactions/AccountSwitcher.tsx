"use client";

import { useRouter, useSearchParams } from "next/navigation";

import type { Account } from "@/types/account";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface Props {
  accounts: Account[];
  selectedId: string;
}

export function AccountSwitcher({
  accounts,
  selectedId,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedAccount = accounts.find(
    (account) => account._id === selectedId
  );

  function formatAccountLabel(account: Account) {
    return `${account.nickname} ••••${account.accountNumber.slice(
      -4
    )} — ${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: account.currency,
    }).format(account.availableBalance)}`;
  }

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Account</h2>

          <p className="text-sm text-muted-foreground">
            Switch between your accounts
          </p>
        </div>

        <Select
          value={selectedId}
          onValueChange={(value) => {
            const accountId = value ?? "";

            if (
              !accountId ||
              accountId === selectedId
            ) {
              return;
            }

            const params = new URLSearchParams(
              searchParams.toString()
            );

            params.set("account", accountId);

            router.push(
              `/dashboard/transactions?${params.toString()}`
            );
          }}
        >
          <SelectTrigger className="w-80">
            {selectedAccount
              ? formatAccountLabel(selectedAccount)
              : "Select Account"}
          </SelectTrigger>

          <SelectContent>
            {accounts.map((account) => (
              <SelectItem
                key={account._id}
                value={account._id}
              >
                {formatAccountLabel(account)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}