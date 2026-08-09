import { Transaction } from "@/models/transaction/Transaction";

import { getTransferLimits } from "@/services/settings/getTransferLimits";
import { getUserTransferLimits } from "@/services/settings/getUserTransferLimits";

interface CheckTransferLimitsInput {
  user: string;

  type: "ACH" | "WIRE" | "ZELLE";

  amount: number;
}

export async function checkTransferLimits({
  user,
  type,
  amount,
}: CheckTransferLimitsInput) {
  const limits = await getTransferLimits(type);

  const userLimits =
    await getUserTransferLimits(user);

  let maxPerTransaction =
    limits.maxPerTransaction;

  let dailyLimit =
    limits.dailyLimit;

  let monthlyLimit =
    limits.monthlyLimit;

  if (userLimits) {
    if (type === "ACH") {
      maxPerTransaction =
        userLimits.achMaxPerTransaction ??
        maxPerTransaction;

      dailyLimit =
        userLimits.achDailyLimit ??
        dailyLimit;

      monthlyLimit =
        userLimits.achMonthlyLimit ??
        monthlyLimit;
    }

    if (type === "WIRE") {
      maxPerTransaction =
        userLimits.wireMaxPerTransaction ??
        maxPerTransaction;

      dailyLimit =
        userLimits.wireDailyLimit ??
        dailyLimit;

      monthlyLimit =
        userLimits.wireMonthlyLimit ??
        monthlyLimit;
    }

    if (type === "ZELLE") {
      maxPerTransaction =
        userLimits.zelleMaxPerTransaction ??
        maxPerTransaction;

      dailyLimit =
        userLimits.zelleDailyLimit ??
        dailyLimit;

      monthlyLimit =
        userLimits.zelleMonthlyLimit ??
        monthlyLimit;
    }
  }

  if (amount > maxPerTransaction) {
    throw new Error(
      "Transfer exceeds the maximum amount allowed."
    );
  }

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const transactions = await Transaction.find({
    user,
    type,
    status: "COMPLETED",
    createdAt: {
      $gte: startOfMonth,
    },
  });

  let dailyTotal = 0;
  let monthlyTotal = 0;

  for (const tx of transactions) {
    monthlyTotal += tx.amount;

    if (tx.createdAt >= startOfToday) {
      dailyTotal += tx.amount;
    }
  }

  if (
    dailyTotal + amount >
    dailyLimit
  ) {
    throw new Error(
      "Daily transfer limit exceeded."
    );
  }

  if (
    monthlyTotal + amount >
    monthlyLimit
  ) {
    throw new Error(
      "Monthly transfer limit exceeded."
    );
  }
}