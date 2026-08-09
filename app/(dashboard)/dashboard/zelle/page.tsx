import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import Link from "next/link";
import dbConnect from "@/lib/db/connect";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";
import ZelleTransfer from "@/models/zelle/ZelleTransfer";

import ZelleTransferForm from "@/components/zelle/ZelleTransferForm";
import RecentTransfers from "@/components/zelle/RecentTransfers";

export default async function ZellePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await dbConnect();

  const user = await User.findById(session.user.id);

  if (!user) {
    redirect("/login");
  }

  const accounts = await Account.find({
    user: user._id,
    status: "ACTIVE",
  }).lean();

 const transfers = await ZelleTransfer.find({
  user: user._id,
})
  .populate(
    "recipient",
    "firstName lastName email"
  )
  .sort({
    createdAt: -1,
  })
  .limit(10)
  .lean();

  const formattedAccounts = accounts.map((account) => ({
    id: String(account._id),

    accountNumber: account.accountNumber,

    accountName:
      account.nickname ??
      `${account.type} Account`,

    balance: account.availableBalance,
  }));

  const formattedTransfers = transfers.map(
  (transfer) => {
    const recipient = transfer.recipient as unknown as {
  firstName: string;
  lastName: string;
  email: string;
};

    return {
      id: String(transfer._id),

      recipientName:
        `${recipient.firstName} ${recipient.lastName}`,

      recipientEmail:
        transfer.recipientEmail,

      amount: Number(transfer.amount),

      memo: transfer.memo ?? "",

      status: transfer.status,

      reference: transfer.reference,

      createdAt: transfer.createdAt,
    };
  }
);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">

    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div>
    <h1 className="text-3xl font-bold">
      Zelle®
    </h1>

    <p className="mt-2 text-muted-foreground">
      Send money securely to friends,
      family, and other Apex National
      Bank customers.
    </p>
  </div>

  <div className="flex gap-3">
  <Link
    href="/dashboard/zelle/request"
    className="rounded-lg bg-black px-5 py-3 font-medium text-white"
  >
    Request Money
  </Link>

  <Link
    href="/dashboard/zelle/requests"
    className="rounded-lg border px-5 py-3 font-medium"
  >
    Incoming Requests
  </Link>
</div>
</div>

      <div className="grid gap-8 lg:grid-cols-2">

        <ZelleTransferForm
          accounts={formattedAccounts}
        />

        <RecentTransfers
          transfers={formattedTransfers}
        />

      </div>

    </div>
  );
}