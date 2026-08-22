import dbConnect from "@/lib/db/connect";

import TransferLimits from "@/models/settings/TransferLimits";

export async function getTransferLimits(
  type: "ACH" | "WIRE" | "ZELLE"
) {
  await dbConnect();

  let limits =
    await TransferLimits.findOne({
      type,
    });

  if (!limits) {
    const defaults = {
      ACH: {
        maxPerTransaction: 25000,
        dailyLimit: 50000,
        monthlyLimit: 250000,
      },

      WIRE: {
        maxPerTransaction: 180000,
        dailyLimit: 250000,
        monthlyLimit: 1000000,
      },

      ZELLE: {
        maxPerTransaction: 3500,
        dailyLimit: 3500,
        monthlyLimit: 20000,
      },
    };

    limits =
      await TransferLimits.create({
        type,
        ...defaults[type],
      });
  }

  return limits;
}