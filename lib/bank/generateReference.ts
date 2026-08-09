export function generateReference(
  prefix = "TXN"
): string {
  const now = new Date();

  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const random = Math.random()
    .toString()
    .slice(2, 10);

  return `${prefix}-${date}-${random}`;
}