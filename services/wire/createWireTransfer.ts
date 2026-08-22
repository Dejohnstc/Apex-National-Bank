import { auth } from "@/lib/auth";
import connectDB from "@/lib/db/connect";

import { Account } from "@/models/account/Account";
import WireTransfer from "@/models/wire/WireTransfer";
import { User } from "@/models/user/User";

import { calculateAchEffectiveDate } from "@/lib/banking/calculateAchEffectiveDate";

import { calculateFee } from "@/services/payments/calculateFee";
import { checkTransferLimits } from "@/services/payments/checkTransferLimits";
import { createNotification } from "@/services/notification/createNotification";
import { createTransaction } from "@/services/payments/createTransaction";
import { generateReference } from "@/services/payments/generateReference";

interface CreateWireTransferInput {
  accountId: string;

  type:
    | "DOMESTIC"
    | "INTERNATIONAL";

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
      success: false as const,
      message: "Unauthorized.",
    };
  }

  await connectDB();

  try {
    const user = await User.findById(
      session.user.id
    );

    if (!user) {
      return {
        success: false as const,
        message: "User not found.",
      };
    }

    const senderName =
      `${user.firstName} ${user.lastName}`;

    /*
     * Validate transfer limits before
     * creating any transaction or wire record.
     *
     * Any limit error is caught below and
     * returned as a normal result so the
     * customer remains on the wire page.
     */
    await checkTransferLimits({
      user: session.user.id,
      type: "WIRE",
      amount: input.amount,
    });

    /*
     * Sender account must belong to the
     * authenticated customer and be active.
     */
    const account =
      await Account.findOne({
        _id: input.accountId,
        user: session.user.id,
        status: "ACTIVE",
      });

    if (!account) {
      return {
        success: false as const,
        message:
          "Account not found or inactive.",
      };
    }

    /*
     * If the destination account number
     * belongs to an active Apex account,
     * retain the internal recipient IDs.
     *
     * If no account exists, the wire remains
     * an external wire.
     */
    const recipientAccount =
      await Account.findOne({
        accountNumber:
          input.accountNumber,
        status: "ACTIVE",
      }).select(
        "_id user accountNumber"
      );

    const fee = calculateFee(
      input.type === "DOMESTIC"
        ? "WIRE_DOMESTIC"
        : "WIRE_INTERNATIONAL"
    );

    const totalDebit =
      input.amount + fee;

    if (
      account.availableBalance <
      totalDebit
    ) {
      return {
        success: false as const,
        message:
          "Insufficient available funds.",
      };
    }

    const now = new Date();

    const effectiveDate =
      await calculateAchEffectiveDate(
        now
      );

    const reference =
      generateReference("WT");

    /*
     * NO MONEY IS MOVED HERE.
     *
     * We create a pending transaction
     * and pending wire. Settlement happens
     * after admin approval.
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

        description:
          `Wire transfer to ${input.recipientName}`,

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

        recipientUserId:
          recipientAccount?.user ??
          null,

        recipientAccountId:
          recipientAccount?._id ??
          null,

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
            status:
              "PENDING",

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

    /*
     * Notification failure must not turn
     * an otherwise successful wire submission
     * into a failed submission.
     */
    try {
      await createNotification({
        user:
          session.user.id,

        title:
          "Wire Transfer Submitted",

        message:
          `Your wire transfer of $${input.amount.toFixed(
            2
          )} has been submitted and is awaiting bank approval.`,

        type:
          "SUCCESS",

        category:
          "WIRE",

        actionUrl:
          `/dashboard/wires/${wire._id.toString()}`,

        metadata: {
          wireId:
            wire._id.toString(),

          reference,

          amount:
            input.amount,

          fee,

          status:
            "PENDING",

          internalRecipient:
            Boolean(
              recipientAccount
            ),
        },
      });
    } catch (notificationError) {
      console.error(
        "Wire submission notification failed:",
        notificationError
      );
    }

    return {
      success: true as const,

      wireId:
        wire._id.toString(),

      reference,

      status:
        "PENDING" as const,

      internalRecipient:
        Boolean(
          recipientAccount
        ),
    };
  } catch (error) {
    console.error(
      "Wire transfer creation failed:",
      error
    );

    return {
      success: false as const,

      message:
        error instanceof Error
          ? error.message
          : "Unable to create wire transfer.",
    };
  }
}