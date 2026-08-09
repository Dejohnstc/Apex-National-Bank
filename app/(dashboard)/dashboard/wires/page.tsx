import { auth } from "@/lib/auth";
import connectDB from "@/lib/db/connect";

import { Account } from "@/models/account/Account";

import WireTransferForm from "@/components/wire/WireTransferForm";
import WireTransferHistory from "@/components/wire/WireTransferHistory";

export default async function WiresPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  await connectDB();

  const accounts = await Account.find({
    user: session.user.id,
  }).lean();

  const formattedAccounts = accounts.map((account) => ({
  id: account._id.toString(),

  // Use nickname if it exists, otherwise fall back to the account type
  accountName:
    account.nickname || `${account.type} Account`,

  accountNumber: account.accountNumber,

  balance: account.availableBalance,
}));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Wire Transfers
        </h1>

        <p className="text-muted-foreground">
          Send domestic and international wire transfers securely.
        </p>
      </div>

      <WireTransferForm
        accounts={formattedAccounts}
      />

      <WireTransferHistory />
    </div>
  );
}