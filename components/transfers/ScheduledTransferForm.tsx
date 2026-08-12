"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { createScheduledTransferAction } from "@/actions/transfer/createScheduledTransfer";

import type { Account } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  accounts: Account[];
}

const frequencies = [
  {
    value: "WEEKLY",
    label: "Weekly",
  },
  {
    value: "BIWEEKLY",
    label: "Every 2 weeks",
  },
  {
    value: "MONTHLY",
    label: "Monthly",
  },
  {
    value: "QUARTERLY",
    label: "Quarterly",
  },
  {
    value: "YEARLY",
    label: "Yearly",
  },
] as const;

export function ScheduledTransferForm({
  accounts,
}: Props) {
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

  const [scheduledDate, setScheduledDate] =
    useState("");

  const [isRecurring, setIsRecurring] =
    useState(false);

  const [
    recurringFrequency,
    setRecurringFrequency,
  ] = useState<
    | "NONE"
    | "WEEKLY"
    | "BIWEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "YEARLY"
  >("NONE");

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

  function resetForm() {
    setAmount("");
    setDescription("");
    setScheduledDate("");
    setIsRecurring(false);
    setRecurringFrequency("NONE");
    setFromAccountId("");
    setToAccountId("");
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!fromAccountId) {
      toast.error(
        "Please select a source account."
      );
      return;
    }

    if (!toAccountId) {
      toast.error(
        "Please select a destination account."
      );
      return;
    }

    if (fromAccountId === toAccountId) {
      toast.error(
        "Source and destination accounts must be different."
      );
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error(
        "Enter a valid transfer amount."
      );
      return;
    }

    if (!scheduledDate) {
      toast.error(
        "Please select a scheduled date."
      );
      return;
    }

    if (
      isRecurring &&
      recurringFrequency === "NONE"
    ) {
      toast.error(
        "Please select a recurring frequency."
      );
      return;
    }

    if (
      !isRecurring &&
      recurringFrequency !== "NONE"
    ) {
      setRecurringFrequency("NONE");
    }

    const date = new Date(
      `${scheduledDate}T12:00:00`
    );

    if (
      !Number.isFinite(date.getTime()) ||
      date.getTime() <= Date.now()
    ) {
      toast.error(
        "Scheduled date must be in the future."
      );
      return;
    }

    startTransition(async () => {
      const result =
        await createScheduledTransferAction({
          fromAccountId,
          toAccountId,
          amount: Number(amount),
          description,
          scheduledDate: date,
          isRecurring,
          recurringFrequency: isRecurring
            ? recurringFrequency
            : "NONE",
        });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        `Transfer scheduled successfully. Reference: ${result.reference}`
      );

      window.dispatchEvent(
        new Event("refresh-notifications")
      );

      resetForm();
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Schedule a Transfer
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                From Account
              </Label>

              <Select
                value={fromAccountId}
                onValueChange={(value) => {
                  setFromAccountId(value ?? "");

                  if (
                    value === toAccountId
                  ) {
                    setToAccountId("");
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>

                <SelectContent>
                  {accounts.map(
                    (account) => (
                      <SelectItem
                        key={account._id}
                        value={account._id}
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

            <div className="space-y-2">
              <Label>
                To Account
              </Label>

              <Select
                value={toAccountId}
                onValueChange={(value) =>
                  setToAccountId(
                    value ?? ""
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination account" />
                </SelectTrigger>

                <SelectContent>
                  {accounts
                    .filter(
                      (account) =>
                        account._id !==
                        fromAccountId
                    )
                    .map((account) => (
                      <SelectItem
                        key={account._id}
                        value={account._id}
                      >
                        {formatAccountLabel(
                          account
                        )}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Amount
              </Label>

              <Input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(event) =>
                  setAmount(
                    event.target.value
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label>
                Scheduled Date
              </Label>

              <Input
                type="date"
                value={scheduledDate}
                min={new Date()
                  .toISOString()
                  .split("T")[0]}
                onChange={(event) =>
                  setScheduledDate(
                    event.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Memo
            </Label>

            <Input
              placeholder="Optional transfer memo"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
            />
          </div>

          <div className="rounded-lg border p-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(event) => {
                  const checked =
                    event.target.checked;

                  setIsRecurring(
                    checked
                  );

                  if (!checked) {
                    setRecurringFrequency(
                      "NONE"
                    );
                  }
                }}
                className="h-4 w-4"
              />

              <span className="font-medium">
                Make this a recurring transfer
              </span>
            </label>

            {isRecurring && (
              <div className="mt-4 space-y-2">
                <Label>
                  Frequency
                </Label>

                <Select
                  value={
                    recurringFrequency
                  }
                  onValueChange={(value) =>
                    setRecurringFrequency(
                      value as typeof recurringFrequency
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>

                  <SelectContent>
                    {frequencies.map(
                      (frequency) => (
                        <SelectItem
                          key={
                            frequency.value
                          }
                          value={
                            frequency.value
                          }
                        >
                          {frequency.label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={
              isPending ||
              accounts.length < 2
            }
            className="w-full"
          >
            {isPending
              ? "Scheduling..."
              : isRecurring
                ? "Schedule Recurring Transfer"
                : "Schedule Transfer"}
          </Button>

          {accounts.length < 2 && (
            <p className="text-center text-sm text-muted-foreground">
              You need at least two active
              accounts to schedule an
              account-to-account transfer.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}