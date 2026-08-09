"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  beneficiarySchema,
  BeneficiaryInput,
} from "@/validators/beneficiaries/beneficiarySchema";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface BeneficiaryFormProps {
  defaultValues?: BeneficiaryInput;

  isPending: boolean;

  onSubmit: (
    values: BeneficiaryInput
  ) => void;
}

export default function BeneficiaryForm({
  defaultValues,
  isPending,
  onSubmit,
}: BeneficiaryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BeneficiaryInput>({
    resolver: zodResolver(
      beneficiarySchema
    ),
    defaultValues: defaultValues ?? {
      nickname: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
      bankCode: "",
      isInternal: false,
      isFavorite: false,
    },
  });

 useEffect(() => {
  reset(
    defaultValues ?? {
      nickname: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
      bankCode: "",
      isInternal: false,
      isFavorite: false,
    }
  );
}, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label>Nickname</Label>

        <Input
          {...register("nickname")}
          placeholder="Payroll"
        />

        {errors.nickname && (
          <p className="text-sm text-destructive">
            {errors.nickname.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Account Name</Label>

        <Input
          {...register("accountName")}
        />

        {errors.accountName && (
          <p className="text-sm text-destructive">
            {errors.accountName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Account Number</Label>

        <Input
          {...register(
            "accountNumber"
          )}
        />

        {errors.accountNumber && (
          <p className="text-sm text-destructive">
            {
              errors.accountNumber
                .message
            }
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Bank Name</Label>

        <Input
          {...register("bankName")}
        />

        {errors.bankName && (
          <p className="text-sm text-destructive">
            {errors.bankName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Bank Code</Label>

        <Input
          {...register("bankCode")}
        />

        {errors.bankCode && (
          <p className="text-sm text-destructive">
            {errors.bankCode.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Label>
          Internal Account
        </Label>

        <Switch
          checked={watch("isInternal")}
          onCheckedChange={(
            checked
          ) =>
            setValue(
              "isInternal",
              checked,
              {
                shouldDirty: true,
              }
            )
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Favorite</Label>

        <Switch
          checked={watch("isFavorite")}
          onCheckedChange={(
            checked
          ) =>
            setValue(
              "isFavorite",
              checked,
              {
                shouldDirty: true,
              }
            )
          }
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        Save Beneficiary
      </Button>
    </form>
  );
}