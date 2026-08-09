import type { AdminTransaction } from "@/types/admin/transaction.types";

interface Props {
  transaction: AdminTransaction;
}

export function TransactionAmount({
  transaction,
}: Props) {
  const positive =
    transaction.direction === "CREDIT";

  return (
    <span
      className={
        positive
          ? "font-semibold text-green-600"
          : "font-semibold text-red-600"
      }
    >
      {positive ? "+" : "-"}

      {transaction.amount.toLocaleString(
        "en-US",
        {
          style: "currency",
          currency:
            transaction.currency,
        }
      )}
    </span>
  );
}