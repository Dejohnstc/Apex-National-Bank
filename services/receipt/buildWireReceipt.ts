import connectDB from "@/lib/db/connect";

import WireTransfer from "@/models/wire/WireTransfer";
import { Account } from "@/models/account/Account";
import { User } from "@/models/user/User";

export async function buildWireReceipt(
  wireId: string
) {
  await connectDB();

  const wire = await WireTransfer.findById(
    wireId
  ).lean();

  if (!wire) {
    throw new Error("Wire transfer not found.");
  }

  const [account, user] = await Promise.all([
    Account.findById(wire.accountId).lean(),
    User.findById(wire.userId).lean(),
  ]);

  return {
    bank: {
      name: "Apex National Bank",
      receiptType: "Wire Transfer Receipt",
      generatedAt: new Date(),
    },

    summary: {
      amount: wire.amount,

      fee: wire.fee,

      total: wire.amount + wire.fee,

      currency: "USD",

      reference: wire.reference,

      confirmationNumber:
        wire.transactionReference,

      transactionReference:
        wire.transactionReference,

      traceNumber:
        wire.traceNumber ?? null,

      submittedAt: wire.createdAt
        ? wire.createdAt.toISOString()
        : undefined,

      effectiveDate: wire.effectiveDate
        ? wire.effectiveDate.toISOString()
        : undefined,

      completedAt: wire.completedAt
        ? wire.completedAt.toISOString()
        : undefined,

      type: wire.type,

      purpose: wire.purpose,
    },

    sender: {
      name: wire.senderName,

      bank: "Apex National Bank",

      accountNumber:
        account?.accountNumber ?? "",

      routingNumber:
        account?.routingNumber,

      swiftCode: undefined,

      country: "United States",
    },

    recipient: {
      name: wire.recipientName,

      bank: wire.bankName,

      accountNumber:
        wire.accountNumber,

      routingNumber:
        wire.routingNumber,

      swiftCode:
        wire.swiftCode,

      country:
        wire.country,
    },

    timeline: (
  wire.history as
    | {
        status: string;
        note?: string;
        createdAt?: Date;
      }[]
    | undefined
    ?? []
).map((item) => ({
  title: item.status,

  completed: true,

  date: item.createdAt
    ? item.createdAt.toISOString()
    : undefined,

  description: item.note,
})),

    compliance: {
      riskStatus:
        wire.risk?.flagged
          ? "FLAGGED"
          : "CLEAR",

      amlStatus:
        wire.aml?.status ??
        "CLEAR",

      reviewedBy:
        wire.risk?.reviewedBy
          ? wire.risk.reviewedBy.toString()
          : undefined,

      reviewDate:
        wire.risk?.reviewedAt
          ? wire.risk.reviewedAt.toISOString()
          : undefined,
    },

    verification: {
      reference:
        wire.reference,

      confirmation:
        wire.transactionReference,

      verified: true,
    },

    customer: {
      firstName:
        user?.firstName,

      lastName:
        user?.lastName,

      email:
        user?.email,
    },

    raw: wire,
  };
}