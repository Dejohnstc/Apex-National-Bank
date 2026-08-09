import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";
import { getExternalAccounts } from "@/services/externalAccounts/getExternalAccounts";
import AchTransferForm from "@/components/ach/AchTransferForm";

type AccountOption = {
  _id: string;
  nickname: string;
  accountNumber: string;
  availableBalance: number;
  type: string;
};

export default async function SendAchPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  await dbConnect();
const externalAccounts =
  await getExternalAccounts();
  const user = await User.findById(session.user.id).lean();

  if (!user) {
    redirect("/auth/login");
  }

  const accountDocs = await Account.find({
  user: user._id,
  status: "ACTIVE",
})
  .select(
    "_id nickname accountNumber availableBalance type"
  )
  .lean();

const accounts: AccountOption[] = accountDocs.map(
  (account) => ({
    _id: account._id.toString(),
    nickname: account.nickname ?? "",
    accountNumber: account.accountNumber,
    availableBalance:
      account.availableBalance,
    type: account.type,
  })
);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Send ACH Transfer
        </h1>

        <p className="text-muted-foreground">
          Send money securely to an account at
          another financial institution using the
          Automated Clearing House (ACH) network.
        </p>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        ACH transfers are typically processed
        within <strong>1–3 business days</strong>.
        Transfers may remain in a{" "}
        <strong>Pending</strong> status until they
        are processed.
      </div>

      {accounts.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-lg font-semibold">
            No Active Accounts
          </h2>

          <p className="mt-2 text-muted-foreground">
            You need an active checking or savings
            account before you can send an ACH
            transfer.
          </p>
        </div>
      ) : (
        <AchTransferForm
  accounts={accounts}
  externalAccounts={externalAccounts}
/>
      )}
    </div>
  );
}