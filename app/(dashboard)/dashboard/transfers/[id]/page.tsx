import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

import { getScheduledTransfer } from "@/services/transfer/getScheduledTransfer";

import ScheduledTransferDetails from "@/components/transfers/ScheduledTransferDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ScheduledTransferDetailsPage({
  params,
}: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const transfer =
    await getScheduledTransfer(
      session.user.id,
      id
    );

  if (!transfer) {
    notFound();
  }

  const serialized = {
    ...transfer,

    _id: transfer._id.toString(),

    fromAccount:
      transfer.fromAccount &&
      typeof transfer.fromAccount ===
        "object"
        ? {
            id: transfer.fromAccount._id.toString(),
            nickname:
              transfer.fromAccount.nickname,
            accountNumber:
              transfer.fromAccount.accountNumber,
            type:
              transfer.fromAccount.type,
            currency:
              transfer.fromAccount.currency,
          }
        : null,

    toAccount:
      transfer.toAccount &&
      typeof transfer.toAccount ===
        "object"
        ? {
            id: transfer.toAccount._id.toString(),
            nickname:
              transfer.toAccount.nickname,
            accountNumber:
              transfer.toAccount.accountNumber,
            type:
              transfer.toAccount.type,
            currency:
              transfer.toAccount.currency,
          }
        : null,

    user: transfer.user.toString(),

    scheduledDate:
      transfer.scheduledDate.toISOString(),

    nextRunAt:
      transfer.nextRunAt?.toISOString() ??
      null,

    lastRunAt:
      transfer.lastRunAt?.toISOString() ??
      null,

    completedAt:
      transfer.completedAt?.toISOString() ??
      null,

    cancelledAt:
      transfer.cancelledAt?.toISOString() ??
      null,

    createdAt:
      transfer.createdAt.toISOString(),

    updatedAt:
      transfer.updatedAt.toISOString(),
  };

  return (
    <ScheduledTransferDetails
      transfer={serialized}
    />
  );
}