"use server";

import { revalidatePath } from "next/cache";

import { updateTransferStatus } from "@/services/admin/transfers/updateTransferStatus";

import type {
  TransferStatus,
  TransferType,
} from "@/services/admin/transfers/types";

export async function updateTransferStatusAction(
  id: string,
  type: TransferType,
  status: TransferStatus,
  adminId?: string,
  note?: string
) {
  const result =
    await updateTransferStatus({
      id,
      type,
      status,
      adminId,
      note,
    });

  revalidatePath("/admin/transfers");
  revalidatePath(`/admin/transfers/${id}`);

  return result;
}