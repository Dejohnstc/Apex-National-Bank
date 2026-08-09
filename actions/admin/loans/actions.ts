"use server";

import { revalidatePath } from "next/cache";

import {
  approveLoan,
  rejectLoan,
  markLoanPaid,
} from "@/services/admin/loans";

export async function approveLoanAction(
  id: string
) {
  await approveLoan(id);

  revalidatePath("/admin/loans");
  revalidatePath(`/admin/loans/${id}`);
}

export async function rejectLoanAction(
  id: string
) {
  await rejectLoan(id);

  revalidatePath("/admin/loans");
  revalidatePath(`/admin/loans/${id}`);
}

export async function markLoanPaidAction(
  id: string
) {
  await markLoanPaid(id);

  revalidatePath("/admin/loans");
  revalidatePath(`/admin/loans/${id}`);
}