"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import BeneficiaryForm from "./BeneficiaryForm";

import { createBeneficiaryAction } from "@/actions/beneficiaries/createBeneficiary";
import { updateBeneficiaryAction } from "@/actions/beneficiaries/updateBeneficiary";

import { BeneficiaryInput } from "@/validators/beneficiaries/beneficiarySchema";

interface BeneficiaryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  beneficiary?: {
    _id: string;

    nickname: string;

    accountName: string;
    accountNumber: string;

    bankName: string;
    bankCode: string;

    isInternal: boolean;
    isFavorite: boolean;
  } | null;
}

export default function BeneficiaryDrawer({
  open,
  onOpenChange,
  beneficiary,
}: BeneficiaryDrawerProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

 const defaultValues: BeneficiaryInput | undefined =
  beneficiary
    ? {
        nickname: beneficiary.nickname,
        accountName: beneficiary.accountName,
        accountNumber:
          beneficiary.accountNumber,
        bankName: beneficiary.bankName,
        bankCode: beneficiary.bankCode,
        isInternal:
          beneficiary.isInternal,
        isFavorite:
          beneficiary.isFavorite,
      }
    : undefined;

  function handleSubmit(
    values: BeneficiaryInput
  ) {
    startTransition(async () => {
      const result = beneficiary
        ? await updateBeneficiaryAction(
            beneficiary._id,
            values
          )
        : await createBeneficiaryAction(
            values
          );

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to save beneficiary."
        );
        return;
      }

      toast.success(result.message);

      onOpenChange(false);

      router.refresh();
    });
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>
              {beneficiary
                ? "Edit Beneficiary"
                : "New Beneficiary"}
            </DrawerTitle>

            <DrawerDescription>
              {beneficiary
                ? "Update beneficiary information."
                : "Add a trusted beneficiary for future transfers."}
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-6 pt-0">
            <BeneficiaryForm
  defaultValues={defaultValues}
  isPending={isPending}
  onSubmit={handleSubmit}
/>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}