import type { TransactionDirection } from "@/types";

interface Props {
  amount: number;
  direction: TransactionDirection;
  currency?: string;
}

export function TransactionAmount({
  amount,
  direction,
  currency = "USD",
}: Props) {
  const formatted =
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);

  return (
    <span
      className={`font-semibold ${
        direction === "CREDIT"
          ? "text-green-600"
          : "text-red-600"
      }`}
    >
      {direction === "CREDIT"
        ? "+"
        : "-"}
      {formatted}
    </span>
  );
}