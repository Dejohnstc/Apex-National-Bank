import dbConnect from "@/lib/db/connect";

import { Transaction } from "@/models/transaction/Transaction";

export async function reverseTransaction(
  id: string
) {
  await dbConnect();

  const transaction =
  await Transaction.findById(id);

if (!transaction) {
  return {
    success: false,
    message:
      "Transaction not found.",
  };
}

if (
  transaction.status ===
  "REVERSED"
) {
  return {
    success: false,
    message:
      "Transaction already reversed.",
  };
}

transaction.status =
  "REVERSED";

await transaction.save();

  return {
    success: true,
  };
}