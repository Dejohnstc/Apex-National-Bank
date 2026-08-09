import { auth } from "@/lib/auth";
import connectDB from "@/lib/db/connect";

import { Account } from "@/models/account/Account";
import WireTransfer from "@/models/wire/WireTransfer";

import { calculateAchEffectiveDate } from "@/lib/banking/calculateAchEffectiveDate";

import { calculateFee } from "@/services/payments/calculateFee";
import { checkTransferLimits } from "@/services/payments/checkTransferLimits";
import { createNotification } from "@/services/notification/createNotification";
import { createTransaction } from "@/services/payments/createTransaction";
import { generateReference } from "@/services/payments/generateReference";
import { User } from "@/models/user/User";
interface CreateWireTransferInput {
  accountId: string;

  type: "DOMESTIC" | "INTERNATIONAL";

  recipientName: string;
  bankName: string;
  accountNumber: string;

  routingNumber?: string;
  swiftCode?: string;
  country?: string;

  amount: number;

  purpose?: string;
}

export async function createWireTransfer(
  input: CreateWireTransferInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  await connectDB();
const user = await User.findById(session.user.id);

if (!user) {
  return {
    success: false,
    message: "User not found.",
  };
}

const senderName =
  `${user.firstName} ${user.lastName}`;
  await checkTransferLimits({
    user: session.user.id,
    type: "WIRE",
    amount: input.amount,
  });

  const account = await Account.findOne({
    _id: input.accountId,
    user: session.user.id,
  });

  if (!account) {
    return {
      success: false,
      message: "Account not found.",
    };
  }

  const totalDebit =
    input.amount +
    calculateFee(
      input.type === "DOMESTIC"
        ? "WIRE_DOMESTIC"
        : "WIRE_INTERNATIONAL"
    );

  if (account.availableBalance < totalDebit) {
    return {
      success: false,
      message: "Insufficient available funds.",
    };
  }

  const now = new Date();

  const effectiveDate =
    await calculateAchEffectiveDate(now);

  const fee = calculateFee(
    input.type === "DOMESTIC"
      ? "WIRE_DOMESTIC"
      : "WIRE_INTERNATIONAL"
  );

  const reference =
    generateReference("WT");

  try {
    /**
     * IMPORTANT
     *
     * NO MONEY IS MOVED HERE.
     *
     * We only create a pending ledger record.
     */

    const transaction =
      await createTransaction({
        account:
          account._id.toString(),

        user:
          session.user.id,

        reference,

        type: "WIRE",

        direction: "DEBIT",

        amount: input.amount,

        fee,

        status: "PENDING",

        balanceBefore:
          account.availableBalance,

        balanceAfter:
          account.availableBalance,

        description: `Wire transfer to ${input.recipientName}`,

        merchant:
          input.bankName,

        category:
          "Wire Transfer",

        counterpartyName:
          input.recipientName,

        counterpartyAccount:
          input.accountNumber,

        memo:
          input.purpose,
      });

    const wire =
      await WireTransfer.create({
        userId:
          session.user.id,

        accountId:
          account._id,

        transactionId:
          transaction._id,

        transactionReference:
          transaction.reference,

        type:
          input.type,

        status:
          "PENDING",

        senderName,

        recipientName:
          input.recipientName,

        bankName:
          input.bankName,

        accountNumber:
          input.accountNumber,

        routingNumber:
          input.routingNumber,

        swiftCode:
          input.swiftCode,

        country:
          input.country,

        amount:
          input.amount,

        fee,

        purpose:
          input.purpose,

        reference,

        effectiveDate,

        history: [
          {
            status: "PENDING",
            changedBy:
              session.user.id,
            actorType:
              "CUSTOMER",
            note:
              "Wire transfer submitted and awaiting approval.",
            createdAt:
              now,
          },
        ],

        notifications: {
          submitted: true,
        },

        risk: {
          score: 0,
          flagged: false,
        },
      });

    await createNotification({
      user:
        session.user.id,

      title:
        "Wire Transfer Submitted",

      message: `Your wire transfer of $${input.amount.toFixed(
        2
      )} has been submitted and is awaiting bank approval.`,

      type: "SUCCESS",

      actionUrl: `/dashboard/wires/${wire._id}`,
    });

    return {
      success: true,
      wireId:
        wire._id.toString(),
      reference,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to create wire transfer.",
    };
  }
}