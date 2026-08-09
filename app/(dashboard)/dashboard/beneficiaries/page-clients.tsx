"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import BeneficiaryDrawer from "@/components/beneficiaries/BeneficiaryDrawer";
import BeneficiaryTable from "@/components/beneficiaries/BeneficiaryTable";
import DeleteBeneficiaryDialog from "@/components/beneficiaries/DeleteBeneficiaryDialog";

interface Beneficiary {
  _id: string;

  nickname: string;

  accountName: string;
  accountNumber: string;

  bankName: string;
  bankCode: string;

  isInternal: boolean;
  isFavorite: boolean;
}

interface Props {
  beneficiaries: Beneficiary[];
}

export default function BeneficiariesPageClient({
  beneficiaries,
}: Props) {
  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [
    selectedBeneficiary,
    setSelectedBeneficiary,
  ] =
    useState<Beneficiary | null>(
      null
    );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Beneficiaries
          </h1>

          <p className="text-muted-foreground">
            Manage saved transfer
            recipients.
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedBeneficiary(
              null
            );

            setDrawerOpen(true);
          }}
        >
          Add Beneficiary
        </Button>
      </div>

      <BeneficiaryTable
        beneficiaries={beneficiaries}
        onEdit={(beneficiary) => {
          setSelectedBeneficiary(
            beneficiary
          );

          setDrawerOpen(true);
        }}
        onDelete={(
          beneficiary
        ) => {
          setSelectedBeneficiary(
            beneficiary
          );

          setDeleteOpen(true);
        }}
      />

      <BeneficiaryDrawer
        open={drawerOpen}
        onOpenChange={
          setDrawerOpen
        }
        beneficiary={
          selectedBeneficiary
        }
      />

      <DeleteBeneficiaryDialog
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
        beneficiary={
          selectedBeneficiary
        }
      />
    </div>
  );
}