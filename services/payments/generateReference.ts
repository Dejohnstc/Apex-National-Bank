import crypto from "crypto";

export function generateReference(prefix: string) {
  return `${prefix}-${crypto
    .randomBytes(5)
    .toString("hex")
    .toUpperCase()}`;
}