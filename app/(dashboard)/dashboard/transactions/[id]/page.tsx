import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

import { getTransaction } from "@/services/transaction/getTransaction";

import { TransactionReceipt } from "@/components/transactions/TransactionReciept";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TransactionPage({
  params,
}: PageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const transaction = await getTransaction(
    id,
    session.user.id
  );

  if (!transaction) {
    redirect("/dashboard/transactions");
  }

  return (
    <TransactionReceipt
      transaction={transaction}
    />
  );
}