"use client";

import {
  useMemo,
  useState,
  useTransition,
} from "react";

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
  accounts?: Account[] | null;
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

  /**
   * Always work with an array.
   *
   * This prevents the page from crashing if
   * the parent temporarily provides undefined
   * or null.
   */
  const safeAccounts = accounts ?? [];

  const destinationAccounts = useMemo(
    () =>
      safeAccounts.filter(
        (account) =>
          account._id !== fromAccountId
      ),
    [safeAccounts, fromAccountId]
  );

  const selectedFromAccount =
    safeAccounts.find(
      (account) =>
        account._id === fromAccountId
    );

  const selectedToAccount =
    destinationAccounts.find(
      (account) =>
        account._id === toAccountId
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

    const numericAmount =
      Number(amount);

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      toast.error(
        "Please enter a valid transfer amount."
      );
      return;
    }

    if (safeAccounts.length < 2) {
      toast.error(
        "You need at least two eligible accounts to make an internal transfer."
      );
      return;
    }

    startTransition(async () => {
      try {
        const result =
          await createTransferAction({
            fromAccountId,
            toAccountId,
            amount: numericAmount,
            description,
          });

        if (!result.success) {
          toast.error(
            result.message ||
              "Unable to complete transfer.",
            {
              duration: 5000,
            }
          );

          return;
        }

        toast.success(
          `Transfer completed. Reference: ${result.reference}`,
          {
            duration: 5000,
          }
        );

        window.dispatchEvent(
          new Event(
            "refresh-notifications"
          )
        );

        setAmount("");
        setDescription("");
        setFromAccountId("");
        setToAccountId("");
      } catch (error) {
        console.error(
          "Internal transfer failed:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to complete transfer.",
          {
            duration: 5000,
          }
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
        {safeAccounts.length < 2 ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-900">
              Internal transfers unavailable
            </p>

            <p className="mt-1 text-sm text-amber-700">
              You need at least two eligible
              accounts to transfer funds between
              your accounts.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {/* FROM ACCOUNT */}

              <Select
                value={fromAccountId}
                onValueChange={(value) => {
                  const selected =
                    value ?? "";

                  setFromAccountId(
                    selected
                  );

                  const other =
                    safeAccounts.find(
                      (account) =>
                        account._id !==
                        selected
                    );

                  if (
                    selected ===
                      toAccountId ||
                    !toAccountId
                  ) {
                    setToAccountId(
                      other?._id ?? ""
                    );
                  }
                }}
              >
                <SelectTrigger>
                  {selectedFromAccount
                    ? formatAccountLabel(
                        selectedFromAccount
                      )
                    : "From Account"}
                </SelectTrigger>

                <SelectContent>
                  {safeAccounts.map(
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

              {/* TO ACCOUNT */}

              <Select
                value={toAccountId}
                onValueChange={(value) => {
                  setToAccountId(
                    value ?? ""
                  );
                }}
              >
                <SelectTrigger>
                  {selectedToAccount
                    ? formatAccountLabel(
                        selectedToAccount
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
                !toAccountId ||
                !amount
              }
              className="w-full"
            >
              {isPending
                ? "Processing..."
                : "Transfer Funds"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}