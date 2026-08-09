"use client";

import { useTransition } from "react";
import {
  Controller,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { Account } from "@/types/account";

import {
  depositSchema,
  type DepositInput,
} from "@/validators/mobile-check-deposit/depositSchema";

import { createDepositAction } from "@/actions/mobile-check-deposit/createDepositAction";

import CheckImageUploader from "@/components/mobile-check-deposit/CheckImageUploader";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  accounts: Account[];
}

export default function DepositForm({
  accounts,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepositInput>({
    resolver: zodResolver(depositSchema),

    defaultValues: {
      account: "",
      amount: 0,
      frontImage: "",
      backImage: "",
    },
  });

  const onSubmit = (values: DepositInput) => {
    startTransition(async () => {
      try {
        await createDepositAction(values);

        toast.success(
          "Deposit submitted successfully."
        );
window.dispatchEvent(
  new Event("refresh-notifications")
);
        reset({
          account: "",
          amount: 0,
          frontImage: "",
          backImage: "",
        });
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to submit deposit."
        );
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Mobile Check Deposit
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <Label>
              Deposit Into
            </Label>

            <select
              {...register("account")}
              className="mt-2 w-full rounded-md border bg-background px-3 py-2"
            >
              <option value="">
                Select Account
              </option>

              {accounts.map((account) => (
                <option
                  key={account._id}
                  value={account._id}
                >
                  {account.type}
                  {" ••••"}
                  {account.accountNumber.slice(-4)}
                  {" — "}
                  {new Intl.NumberFormat(
                    "en-US",
                    {
                      style: "currency",
                      currency:
                        account.currency,
                    }
                  ).format(
                    account.availableBalance
                  )}
                </option>
              ))}
            </select>

            <p className="mt-1 text-sm text-red-500">
              {errors.account?.message}
            </p>
          </div>

          <div>
            <Label>
              Check Amount
            </Label>

            <Input
              type="number"
              step="0.01"
              {...register("amount")}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.amount?.message}
            </p>
          </div>

          <Controller
            name="frontImage"
            control={control}
            render={({ field }) => (
              <>
                <CheckImageUploader
                  label="Front of Check"
                  value={field.value}
                  onChange={field.onChange}
                />

                <p className="mt-1 text-sm text-red-500">
                  {errors.frontImage?.message}
                </p>
              </>
            )}
          />

          <Controller
            name="backImage"
            control={control}
            render={({ field }) => (
              <>
                <CheckImageUploader
                  label="Back of Check"
                  value={field.value}
                  onChange={field.onChange}
                />

                <p className="mt-1 text-sm text-red-500">
                  {errors.backImage?.message}
                </p>
              </>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending
              ? "Submitting..."
              : "Submit Deposit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}