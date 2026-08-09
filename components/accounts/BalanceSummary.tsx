import type { Account } from "@/types/account";

interface BalanceSummaryProps {
  account: Account;
}

export function BalanceSummary({
  account,
}: BalanceSummaryProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: account.currency,
    }).format(value);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border p-6">
        <p className="text-sm text-muted-foreground">
          Available Balance
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {formatCurrency(
            account.availableBalance
          )}
        </h2>
      </div>

      <div className="rounded-2xl border p-6">
        <p className="text-sm text-muted-foreground">
          Current Balance
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {formatCurrency(
            account.currentBalance
          )}
        </h2>
      </div>
    </div>
  );
}