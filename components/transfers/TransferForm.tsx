"use client";

import { useMemo, useState, useTransition } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,

} from "@/components/ui/select";

import { createTransferAction } from "@/app/(dashboard)/dashboard/transfers/actions";

import type { Account } from "@/types";

interface TransferFormProps {
  accounts: Account[];
}

export function TransferForm({
  accounts,
}: TransferFormProps) {
  const [isPending, startTransition] =
    useTransition();

  const [fromAccountId, setFromAccountId] =
    useState("");

  const [toAccountId, setToAccountId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [description, setDescription] =
    useState("");

  const destinationAccounts = useMemo(
    () =>
      accounts.filter(
        (account) =>
          account._id !== fromAccountId
      ),
    [accounts, fromAccountId]
  );

  function formatAccountLabel(
    account: Account
  ) {
    return `${account.nickname} ••••${account.accountNumber.slice(
      -4
    )} — ${new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: account.currency,
      }
    ).format(account.availableBalance)}`;
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!fromAccountId) {
      toast.error(
        "Please select the account to transfer from."
      );
      return;
    }

    if (!toAccountId) {
      toast.error(
        "Please select the destination account."
      );
      return;
    }

    if (fromAccountId === toAccountId) {
      toast.error(
        "You cannot transfer to the same account."
      );
      return;
    }

    startTransition(async () => {
      try {
        const result =
         await createTransferAction({
  fromAccountId,
  toAccountId,
  amount: Number(amount),
  description,
});

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(
          `Transfer completed. Reference: ${result.reference}`
        );
        
window.dispatchEvent(
  new Event("refresh-notifications")
);
        setAmount("");
        setDescription("");
        setFromAccountId("");
        setToAccountId("");
      } catch {
        toast.error(
          "Unable to complete transfer."
        );
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Transfer Between Accounts
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              value={fromAccountId}
              onValueChange={(value) => {
  const selected = value ?? "";

  setFromAccountId(selected);

  const other = accounts.find(
    (account) => account._id !== selected
  );

  if (
    selected === toAccountId ||
    !toAccountId
  ) {
    setToAccountId(other?._id ?? "");
  }
}}
            >
              <SelectTrigger>
  {fromAccountId
    ? formatAccountLabel(
        accounts.find(
          (a) => a._id === fromAccountId
        )!
      )
    : "From Account"}
</SelectTrigger>

              <SelectContent>
                {accounts.map(
                  (account) => (
                    <SelectItem
                      key={account._id}
                      value={
                        account._id
                      }
                    >
                      {formatAccountLabel(
                        account
                      )}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <Select
              value={toAccountId}
              onValueChange={(value) => {
  setToAccountId(value ?? "");
}}
            >
              <SelectTrigger>
  {toAccountId
    ? formatAccountLabel(
        destinationAccounts.find(
          (a) => a._id === toAccountId
        )!
      )
    : "To Account"}
</SelectTrigger>

              <SelectContent>
                {destinationAccounts.map(
                  (account) => (
                    <SelectItem
                      key={account._id}
                      value={
                        account._id
                      }
                    >
                      {formatAccountLabel(
                        account
                      )}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <Input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Memo (optional)"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <Button
            type="submit"
            disabled={
              isPending ||
              !fromAccountId ||
              !toAccountId
            }
            className="w-full"
          >
            {isPending
              ? "Processing..."
              : "Transfer Funds"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}