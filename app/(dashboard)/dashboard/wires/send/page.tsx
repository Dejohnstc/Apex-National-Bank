import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import connectDB from "@/lib/db/connect";

import { Account } from "@/models/account/Account";

import WireTransferForm from "@/components/wire/WireTransferForm";

export default async function SendWirePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();

  const accounts = await Account.find({
    user: session.user.id,
    status: "ACTIVE",
  })
    .sort({
      createdAt: 1,
    })
    .lean();

  const formattedAccounts = accounts.map(
    (account) => ({
      id: account._id.toString(),
      accountName:
        account.nickname ??
        account.type ??
        "Checking Account",
      accountNumber:
        account.accountNumber,
      balance:
        account.availableBalance,
    })
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Send Wire Transfer
        </h1>

        <p className="mt-2 text-slate-500">
          Send domestic or international wire transfers securely through Apex National Bank.
        </p>

      </div>

      <WireTransferForm
        accounts={formattedAccounts}
      />

    </div>
  );
}