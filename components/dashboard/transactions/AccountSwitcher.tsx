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

  function formatMobileAccountLabel(account: Account) {
    return `${account.nickname} ••••${account.accountNumber.slice(
      -4
    )}`;
  }

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Account Information */}

        <div className="min-w-0">
          <h2 className="font-semibold">
            Account
          </h2>

          <p className="text-sm text-muted-foreground">
            Switch between your accounts
          </p>
        </div>

        {/* Account Selector */}

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
          <SelectTrigger className="w-full min-w-0 sm:w-80">
            {selectedAccount ? (
              <span className="block min-w-0 truncate text-left">
                {/* Mobile */}

                <span className="sm:hidden">
                  {formatMobileAccountLabel(
                    selectedAccount
                  )}
                </span>

                {/* Desktop */}

                <span className="hidden sm:inline">
                  {formatAccountLabel(
                    selectedAccount
                  )}
                </span>
              </span>
            ) : (
              "Select Account"
            )}
          </SelectTrigger>

          <SelectContent className="max-w-[calc(100vw-2rem)]">
            {accounts.map((account) => (
              <SelectItem
                key={account._id}
                value={account._id}
              >
                <span className="block max-w-[calc(100vw-4rem)] truncate">
                  {formatAccountLabel(account)}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>

      {/* Mobile Balance */}

      {selectedAccount && (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 sm:hidden">
          <span className="text-xs text-slate-500">
            Available Balance
          </span>

          <span className="text-sm font-bold text-slate-900">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: selectedAccount.currency,
            }).format(
              selectedAccount.availableBalance
            )}
          </span>
        </div>
      )}

    </div>
  );
}