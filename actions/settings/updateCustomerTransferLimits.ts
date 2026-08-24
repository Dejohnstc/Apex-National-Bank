"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db/connect";

import TransferLimits from "@/models/settings/TransferLimits";
import UserTransferLimits from "@/models/user/UserTransferLimits";

interface TransferInput {
  maxPerTransaction: number;
  dailyLimit: number;
  monthlyLimit: number;
}

interface UpdateLimitsInput {
  ach: TransferInput;
  wire: TransferInput;
  zelle: TransferInput;
}

export async function updateCustomerTransferLimits(
  input: UpdateLimitsInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  await dbConnect();

  const [
    ach,
    wire,
    zelle,
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
  ]);

  const limits = {
    ACH: {
      maxPerTransaction:
        ach?.maxPerTransaction ?? 25000,
      dailyLimit:
        ach?.dailyLimit ?? 50000,
      monthlyLimit:
        ach?.monthlyLimit ?? 250000,
    },

    WIRE: {
      maxPerTransaction:
        wire?.maxPerTransaction ?? 100000,
      dailyLimit:
        wire?.dailyLimit ?? 250000,
      monthlyLimit:
        wire?.monthlyLimit ?? 1000000,
    },

    ZELLE: {
      maxPerTransaction:
        zelle?.maxPerTransaction ?? 3500,
      dailyLimit:
        zelle?.dailyLimit ?? 3500,
      monthlyLimit:
        zelle?.monthlyLimit ?? 20000,
    },
  };

  const requested = {
    ACH: input.ach,
    WIRE: input.wire,
    ZELLE: input.zelle,
  };

  for (const type of [
    "ACH",
    "WIRE",
    "ZELLE",
  ] as const) {
    const value = requested[type];
    const maximum = limits[type];

    if (
      !Number.isFinite(
        value.maxPerTransaction
      ) ||
      !Number.isFinite(value.dailyLimit) ||
      !Number.isFinite(
        value.monthlyLimit
      )
    ) {
      return {
        success: false,
        message: `${type} limits must contain valid numbers.`,
      };
    }

    if (
      value.maxPerTransaction < 0 ||
      value.dailyLimit < 0 ||
      value.monthlyLimit < 0
    ) {
      return {
        success: false,
        message: `${type} limits cannot be negative.`,
      };
    }

    if (
      value.maxPerTransaction >
      maximum.maxPerTransaction
    ) {
      return {
        success: false,
        message: `${type} per-transaction limit cannot exceed the bank maximum.`,
      };
    }

    if (
      value.dailyLimit >
      maximum.dailyLimit
    ) {
      return {
        success: false,
        message: `${type} daily limit cannot exceed the bank maximum.`,
      };
    }

    if (
      value.monthlyLimit >
      maximum.monthlyLimit
    ) {
      return {
        success: false,
        message: `${type} monthly limit cannot exceed the bank maximum.`,
      };
    }

    if (
      value.maxPerTransaction >
      value.dailyLimit
    ) {
      return {
        success: false,
        message: `${type} per-transaction limit cannot exceed the daily limit.`,
      };
    }

    if (
      value.dailyLimit >
      value.monthlyLimit
    ) {
      return {
        success: false,
        message: `${type} daily limit cannot exceed the monthly limit.`,
      };
    }
  }

  await UserTransferLimits.findOneAndUpdate(
    {
      user: session.user.id,
    },
    {
      user: session.user.id,

      achMaxPerTransaction:
        input.ach.maxPerTransaction,

      achDailyLimit:
        input.ach.dailyLimit,

      achMonthlyLimit:
        input.ach.monthlyLimit,

      wireMaxPerTransaction:
        input.wire.maxPerTransaction,

      wireDailyLimit:
        input.wire.dailyLimit,

      wireMonthlyLimit:
        input.wire.monthlyLimit,

      zelleMaxPerTransaction:
        input.zelle.maxPerTransaction,

      zelleDailyLimit:
        input.zelle.dailyLimit,

      zelleMonthlyLimit:
        input.zelle.monthlyLimit,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  return {
    success: true,
    message:
      "Transfer limits updated successfully.",
  };
}