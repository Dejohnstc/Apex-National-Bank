import type { TransactionListItem } from "@/services/transaction/getTransactions";

interface Props {
  transactions: TransactionListItem[];
}

export function TransactionAnalytics({
  transactions,
}: Props) {
  const completed = transactions.filter(
    (t) => t.status === "COMPLETED"
  ).length;

  const pending = transactions.filter(
    (t) => t.status === "PENDING"
  ).length;

  const average =
    transactions.length === 0
      ? 0
      : transactions.reduce(
          (sum, t) => sum + t.amount,
          0
        ) / transactions.length;

  const largest =
    transactions.length === 0
      ? 0
      : Math.max(
          ...transactions.map(
            (t) => t.amount
          )
        );

  return (
    <div className="grid gap-5 md:grid-cols-4">
      <Card
        title="Completed"
        value={completed.toString()}
      />

      <Card
        title="Pending"
        value={pending.toString()}
      />

      <Card
        title="Average"
        value={formatMoney(average)}
      />

      <Card
        title="Largest"
        value={formatMoney(largest)}
      />
    </div>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  ).format(value);
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {value}
      </h2>
    </div>
  );
}