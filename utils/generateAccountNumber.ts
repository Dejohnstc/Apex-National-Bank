import { Account } from "@/models/account/Account";

export async function generateAccountNumber(): Promise<string> {
  while (true) {
    const accountNumber = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 10)
    ).join("");

    const exists = await Account.exists({
      accountNumber,
    });

    if (!exists) {
      return accountNumber;
    }
  }
}