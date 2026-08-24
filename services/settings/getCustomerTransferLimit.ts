import dbConnect from "@/lib/db/connect";

import TransferLimits from "@/models/settings/TransferLimits";
import UserTransferLimits from "@/models/user/UserTransferLimits";

export async function getCustomerTransferLimits(
  userId: string
) {
  await dbConnect();

  const [
    ach,
    wire,
    zelle,
    personal,
  ] = await Promise.all([
    TransferLimits.findOne({
      type: "ACH",
    }).lean(),

    TransferLimits.findOne({
      type: "WIRE",
    }).lean(),

    TransferLimits.findOne({
      type: "ZELLE",
    }).lean(),

    UserTransferLimits.findOne({
      user: userId,
    }).lean(),
  ]);

  return {
    ach: {
      maxPerTransaction:
        personal?.achMaxPerTransaction ??
        ach?.maxPerTransaction ??
        25000,

      dailyLimit:
        personal?.achDailyLimit ??
        ach?.dailyLimit ??
        50000,

      monthlyLimit:
        personal?.achMonthlyLimit ??
        ach?.monthlyLimit ??
        250000,

      bankMaxPerTransaction:
        ach?.maxPerTransaction ?? 25000,

      bankDailyLimit:
        ach?.dailyLimit ?? 50000,

      bankMonthlyLimit:
        ach?.monthlyLimit ?? 250000,
    },

    wire: {
      maxPerTransaction:
        personal?.wireMaxPerTransaction ??
        wire?.maxPerTransaction ??
        100000,

      dailyLimit:
        personal?.wireDailyLimit ??
        wire?.dailyLimit ??
        250000,

      monthlyLimit:
        personal?.wireMonthlyLimit ??
        wire?.monthlyLimit ??
        1000000,

      bankMaxPerTransaction:
        wire?.maxPerTransaction ?? 100000,

      bankDailyLimit:
        wire?.dailyLimit ?? 250000,

      bankMonthlyLimit:
        wire?.monthlyLimit ?? 1000000,
    },

    zelle: {
      maxPerTransaction:
        personal?.zelleMaxPerTransaction ??
        zelle?.maxPerTransaction ??
        3500,

      dailyLimit:
        personal?.zelleDailyLimit ??
        zelle?.dailyLimit ??
        3500,

      monthlyLimit:
        personal?.zelleMonthlyLimit ??
        zelle?.monthlyLimit ??
        20000,

      bankMaxPerTransaction:
        zelle?.maxPerTransaction ?? 3500,

      bankDailyLimit:
        zelle?.dailyLimit ?? 3500,

      bankMonthlyLimit:
        zelle?.monthlyLimit ?? 20000,
    },
  };
}