interface UserAccount {
  id: string;
  accountNumber: string;
  routingNumber: string;
  accountType: string;
  status: string;
  currentBalance: number;
  availableBalance: number;
  createdAt: string;
}

interface Props {
  accounts: UserAccount[];
}

export function UserAccountsCard({
  accounts,
}: Props) {
  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Bank Accounts
        </h2>
      </div>

      <div className="divide-y">
        {accounts.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">
            No bank accounts found.
          </div>
        )}

        {accounts.map((account) => (
          <div
            key={account.id}
            className="p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">
                  {account.accountType}
                </div>

                <div className="mt-1 text-sm text-gray-500">
                  ****
                  {account.accountNumber.slice(-4)}
                </div>

                <div className="text-xs text-gray-400">
                  Routing: {account.routingNumber}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500">
                  Available Balance
                </div>

                <div className="text-xl font-bold">
                  $
                  {account.availableBalance.toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </div>

                <div className="mt-1 text-sm text-gray-500">
                  Current Balance: $
                  {account.currentBalance.toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}