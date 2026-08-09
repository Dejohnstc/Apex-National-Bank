import crypto from "crypto";

export function generateReference() {
  return (
    "APX-" +
    Date.now() +
    "-" +
    crypto.randomBytes(4).toString("hex").toUpperCase()
  );
}