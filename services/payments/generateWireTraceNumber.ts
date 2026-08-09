export async function generateWireTraceNumber() {
  const now = new Date();

  const date =
    `${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(
      now.getDate()
    ).padStart(2, "0")}`;

  const sequence = Math.floor(
    100000 + Math.random() * 900000
  );

  return `026009593-${date}-${sequence}`;
}