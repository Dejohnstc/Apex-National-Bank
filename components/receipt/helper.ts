export function formatMoney(
  amount: number,
  currency = "USD"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(
  value?: string | Date
) {
  if (!value) return "-";

  return new Date(value).toLocaleString(
    "en-US",
    {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

export function maskAccount(
  account: string
) {
  if (account.length <= 4)
    return account;

  return (
    "*".repeat(account.length - 4) +
    account.slice(-4)
  );
}