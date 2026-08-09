import type { Account } from "@/types/account";

interface AccountHeaderProps {
  account: Account;
}

export function AccountHeader({
  account,
}: AccountHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          {account.nickname}
        </h1>

        <p className="mt-1 text-muted-foreground">
          {account.type} Account
        </p>
      </div>

      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
        {account.status}
      </span>
    </div>
  );
}