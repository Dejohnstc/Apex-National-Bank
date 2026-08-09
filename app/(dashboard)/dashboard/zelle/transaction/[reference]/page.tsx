import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";
import DownloadReceiptButton from "@/components/zelle/DownloadReceiptButton";
import ZelleTransfer from "@/models/zelle/ZelleTransfer";
import { Account } from "@/models/account/Account";
import PrintReceiptButton from "@/components/zelle/PrintReceiptButton";
interface Props {
  params: Promise<{
    reference: string;
  }>;
}

export default async function TransactionPage({
  params,
}: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { reference } = await params;

  await dbConnect();

  const transfer = await ZelleTransfer.findOne({
    reference,
    user: session.user.id,
  })
    .populate(
      "recipient",
      "firstName lastName email"
    )
    .lean();

  if (!transfer) {
    notFound();
  }

  const account = await Account.findById(
    transfer.account
  ).lean();

  const recipient =
    transfer.recipient as unknown as {
      firstName: string;
      lastName: string;
      email: string;
    };

  const accountName =
    account?.nickname ??
    `${account?.type ?? "Checking"} Account`;

  return (
    <div className="mx-auto max-w-2xl p-6">

      <Link
        href="/dashboard/zelle"
        className="mb-6 inline-block text-sm text-blue-600 hover:underline"
      >
        ← Back to Zelle
      </Link>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <div className="border-b bg-green-50 px-8 py-10 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-4xl font-bold text-white">
            ✓
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            Transfer Complete
          </h1>

          <p className="mt-2 text-gray-600">
            Your payment has been sent successfully.
          </p>

          <p className="mt-8 text-5xl font-bold">
            $
            {Number(
              transfer.amount
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>

        </div>

        <div className="space-y-5 p-8">

          <DetailRow
            label="Recipient"
            value={`${recipient.firstName} ${recipient.lastName}`}
          />

          <DetailRow
            label="Email"
            value={recipient.email}
          />

          <DetailRow
            label="From Account"
            value={accountName}
          />

          <DetailRow
            label="Reference"
            value={transfer.reference}
          />

          <DetailRow
            label="Status"
            value={transfer.status}
          />

          <DetailRow
            label="Memo"
            value={transfer.memo || "None"}
          />

          <DetailRow
            label="Date"
            value={new Date(
              transfer.createdAt
            ).toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          />

        </div>

        <div className="flex gap-4 border-t p-6">

<PrintReceiptButton />

  <DownloadReceiptButton
    amount={Number(transfer.amount)}
    recipient={`${recipient.firstName} ${recipient.lastName}`}
    email={recipient.email}
    account={accountName}
    reference={transfer.reference}
    memo={transfer.memo ?? ""}
    status={transfer.status}
    date={new Date(
      transfer.createdAt
    ).toLocaleString()}
  />

</div>

      </div>

    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-0">

      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold text-right">
        {value}
      </span>

    </div>
  );
}