export function TransactionEmpty() {
  return (
    <div className="rounded-xl border bg-card p-12 text-center">
      <h2 className="text-xl font-semibold">
        No Transactions
      </h2>

      <p className="mt-2 text-muted-foreground">
        Transactions for this account will
        appear here.
      </p>
    </div>
  );
}