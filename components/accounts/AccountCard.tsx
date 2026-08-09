import Link from "next/link";

import type { Account } from "@/types/account";

interface AccountCardProps {
  account: Account;
}

export function AccountCard({
  account,
}: AccountCardProps) {
  const maskedAccountNumber = `****${account.accountNumber.slice(-4)}`;

  const formattedBalance = new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: account.currency,
    }
  ).format(account.availableBalance);

  return (
    <Link
      href={`/dashboard/transactions?account=${account._id}`}
      className="block rounded-2xl border bg-card p-6 transition hover:border-primary hover:shadow-md"
    >
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold">
            {account.nickname ||
              `${account.type.charAt(0)}${account.type
                .slice(1)
                .toLowerCase()} Account`}
          </h3>

          <p className="text-sm text-muted-foreground">
            {account.type}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Account Number
          </p>

          <p className="font-medium tracking-widest">
            {maskedAccountNumber}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Available Balance
          </p>

          <p className="text-3xl font-bold">
            {formattedBalance}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {account.status}
          </span>

          <span className="text-sm font-medium text-primary">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}