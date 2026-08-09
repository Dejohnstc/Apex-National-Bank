export function formatMoney(
  value: number,
  currency = "USD"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

export function formatShortDate(
  value: string | Date
) {
  return new Date(value).toLocaleDateString(
    "en-US"
  );
}

export function formatLongDate(
  value: string | Date
) {
  return new Date(value).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

export function truncate(
  text: string,
  length = 30
) {
  return text.length <= length
    ? text
    : `${text.slice(0, length - 3)}...`;
}