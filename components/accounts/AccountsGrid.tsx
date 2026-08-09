import { AccountCard } from "./AccountCard";

import type { Account } from "@/types/account";

interface AccountsGridProps {
  accounts: Account[];
}

export function AccountsGrid({
  accounts,
}: AccountsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {accounts.map((account) => (
        <AccountCard
          key={account._id}
          account={account}
        />
      ))}
    </div>
  );
}