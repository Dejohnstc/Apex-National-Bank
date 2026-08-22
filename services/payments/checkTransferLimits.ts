import { Transaction } from "@/models/transaction/Transaction";

import { getTransferLimits } from "@/services/settings/getTransferLimits";
import { getUserTransferLimits } from "@/services/settings/getUserTransferLimits";

interface CheckTransferLimitsInput {
  user: string;

  type: "ACH" | "WIRE" | "ZELLE";

  amount: number;
}

function formatCurrency(
  amount: number
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  ).format(amount);
}

export async function checkTransferLimits({
  user,
  type,
  amount,
}: CheckTransferLimitsInput) {
  const limits =
    await getTransferLimits(type);

  const userLimits =
    await getUserTransferLimits(user);

  let maxPerTransaction =
    limits.maxPerTransaction;

  let dailyLimit =
    limits.dailyLimit;

  let monthlyLimit =
    limits.monthlyLimit;

  /*
   * User-specific limits override the
   * global transfer limits when present.
   */
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

  /*
   * Per-transaction limit.
   */
  if (amount > maxPerTransaction) {
    throw new Error(
      `Your ${type} transfer exceeds the maximum allowed per transaction of ${formatCurrency(
        maxPerTransaction
      )}.`
    );
  }

  const now = new Date();

  const startOfToday =
    new Date(now);

  startOfToday.setHours(
    0,
    0,
    0,
    0
  );

  const startOfMonth =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

  /*
   * Include completed transactions
   * for the current month.
   */
  const transactions =
    await Transaction.find({
      user,
      type,
      status: "COMPLETED",
      createdAt: {
        $gte: startOfMonth,
      },
    }).lean();

  let dailyTotal = 0;
  let monthlyTotal = 0;

  for (const tx of transactions) {
    const transactionAmount =
      Number(tx.amount) || 0;

    monthlyTotal +=
      transactionAmount;

    if (
      new Date(tx.createdAt) >=
      startOfToday
    ) {
      dailyTotal +=
        transactionAmount;
    }
  }

  /*
   * Daily limit.
   */
  if (
    dailyTotal + amount >
    dailyLimit
  ) {
    const remainingDaily =
      Math.max(
        0,
        dailyLimit - dailyTotal
      );

    throw new Error(
      `Your ${type} daily transfer limit has been exceeded. Your remaining daily limit is ${formatCurrency(
        remainingDaily
      )}.`
    );
  }

  /*
   * Monthly limit.
   */
  if (
    monthlyTotal + amount >
    monthlyLimit
  ) {
    const remainingMonthly =
      Math.max(
        0,
        monthlyLimit - monthlyTotal
      );

    throw new Error(
      `Your ${type} monthly transfer limit has been exceeded. Your remaining monthly limit is ${formatCurrency(
        remainingMonthly
      )}.`
    );
  }
}