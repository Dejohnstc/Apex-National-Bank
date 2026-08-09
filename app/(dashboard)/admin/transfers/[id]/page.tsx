import { notFound } from "next/navigation";

import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";
import { TransferDetailCard } from "@/components/admin/transfers/TransferDetailCard";

import { getTransferById } from "@/services/admin/transfers/getTransferById";

import type { TransferType } from "@/services/admin/transfers/types";

interface Props {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function TransferPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { type } = await searchParams;

  const result =
    await getTransferById(
      id,
      (type as TransferType) ??
        "ACH"
    );

  if (
    !result.success ||
    !result.data
  ) {
    notFound();
  }

  const transfer = result.data as {
    reference?: string;
    recipientName?: string;
  };

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        title={
          transfer.reference ??
          "Transfer"
        }
        description={
          transfer.recipientName ??
          ""
        }
      />

      <TransferDetailCard
        transfer={result.data}
      />
    </div>
  );
}