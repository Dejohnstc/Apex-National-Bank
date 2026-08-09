"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteBeneficiaryAction } from "@/actions/beneficiaries/deleteBeneficiary";

interface DeleteBeneficiaryDialogProps {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  beneficiary?: {
    _id: string;
    accountName: string;
  } | null;
}

export default function DeleteBeneficiaryDialog({
  open,
  onOpenChange,
  beneficiary,
}: DeleteBeneficiaryDialogProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    if (!beneficiary) return;

    startTransition(async () => {
      const result =
        await deleteBeneficiaryAction(
          beneficiary._id
        );

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to delete beneficiary."
        );
        return;
      }

      toast.success(result.message);

      onOpenChange(false);

      router.refresh();
    });
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Beneficiary
          </AlertDialogTitle>

          <AlertDialogDescription>
            {beneficiary
              ? `Are you sure you want to remove ${beneficiary.accountName}?`
              : "Are you sure you want to remove this beneficiary?"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}