"use client";

import { useTransition } from "react";
import {
  useForm,
  
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { createPaymentAction } from "@/actions/bill-payments/createPaymentAction";

import {
  paymentSchema,
  type PaymentInput,
} from "@/validators/bill-payments/paymentSchema";

import type { Account } from "@/types/account";

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

export default function PaymentForm({
  accounts,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<PaymentInput>({
  resolver: zodResolver(paymentSchema),
  defaultValues: {
    account: "",
    biller: "",
    category: "Electric",
    accountNumber: "",
    amount: 0,
    memo: "",
    isRecurring: false,
    recurringFrequency: "NONE",
  },
});

  const onSubmit = (values: PaymentInput) => {
  startTransition(async () => {
    try {
      await createPaymentAction(values);

      toast.success("Payment submitted successfully.");
window.dispatchEvent(
  new Event("refresh-notifications")
);
     reset({
  account: "",
  biller: "",
  category: "Electric",
  accountNumber: "",
  amount: 0,
  memo: "",
  isRecurring: false,
  recurringFrequency: "NONE",
});
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to submit payment."
      );
    }
  });
};
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Pay a Bill
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2"
        >
          {/* Pay From */}

          <div className="space-y-2">
            <Label>
              Pay From Account
            </Label>

            <select
              {...register("account")}
              className="w-full rounded-md border bg-background px-3 py-2"
            >
              <option value="">
                Select account
              </option>

              {accounts.map(
                (account) => (
                  <option
                    key={account._id}
                    value={account._id}
                  >
                    {account.type}
                    {" ••••"}
                    {account.accountNumber.slice(
                      -4
                    )}
                    {" — "}
                    {new Intl.NumberFormat(
                      "en-US",
                      {
                        style:
                          "currency",
                        currency:
                          account.currency,
                      }
                    ).format(
                      account.availableBalance
                    )}
                  </option>
                )
              )}
            </select>

            <p className="text-sm text-red-500">
              {errors.account?.message}
            </p>
          </div>

          {/* Biller */}

          <div className="space-y-2">
            <Label>Biller</Label>

            <Input
              placeholder="Netflix"
              {...register(
                "biller"
              )}
            />

            <p className="text-sm text-red-500">
              {errors.biller?.message}
            </p>
          </div>

          {/* Category */}

          <div className="space-y-2">
            <Label>Category</Label>

            <select
              {...register(
                "category"
              )}
              className="w-full rounded-md border bg-background px-3 py-2"
            >
              <option value="Electric">
                Electric
              </option>

              <option value="Water">
                Water
              </option>

              <option value="Internet">
                Internet
              </option>

              <option value="Phone">
                Phone
              </option>

              <option value="Insurance">
                Insurance
              </option>

              <option value="Mortgage">
                Mortgage
              </option>

              <option value="Credit Card">
                Credit Card
              </option>

              <option value="Streaming">
                Streaming
              </option>

              <option value="Healthcare">
                Healthcare
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Biller Account */}

          <div className="space-y-2">
            <Label>
              Biller Account Number
            </Label>

            <Input
              {...register(
                "accountNumber"
              )}
            />

            <p className="text-sm text-red-500">
              {
                errors
                  .accountNumber
                  ?.message
              }
            </p>
          </div>

          {/* Amount */}

          <div className="space-y-2">
            <Label>Amount</Label>

            <Input
  type="number"
  step="0.01"
  {...register("amount")}
/>

            <p className="text-sm text-red-500">
              {errors.amount?.message}
            </p>
          </div>

          {/* Memo */}

          <div className="space-y-2 md:col-span-2">
            <Label>Memo</Label>

            <Input
              {...register("memo")}
            />
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
            >
              {isPending
                ? "Processing..."
                : "Submit Payment"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}