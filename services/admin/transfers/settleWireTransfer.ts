import mongoose, { Types } from "mongoose";

import connectDB from "@/lib/db/connect";

import WireTransfer from "@/models/wire/WireTransfer";
import { Account } from "@/models/account/Account";
import { Transaction } from "@/models/transaction/Transaction";

import { generateWireTraceNumber } from "@/services/payments/generateWireTraceNumber";
import { createNotification } from "@/services/notification/createNotification";

interface SettleWireTransferInput {
  wireId: string;
  adminId?: string;
}

export async function settleWireTransfer({
  wireId,
  adminId,
}: SettleWireTransferInput) {
  await connectDB();

  const session =
    await mongoose.startSession();

  let senderUserId = "";
  let recipientUserId = "";
  let amount = 0;
  let fee = 0;
  let reference = "";
  let traceNumber = "";
  let wireIdString = "";
  let isInternal = false;

  try {
    session.startTransaction();

    /*
     * Only approved/processing wires can be
     * settled.
     */
    const wire =
      await WireTransfer.findOne({
        _id: wireId,
        status: {
          $in: [
            "APPROVED",
            "PROCESSING",
          ],
        },
      }).session(session);

    if (!wire) {
      throw new Error(
        "Approved wire transfer not found."
      );
    }

    if (!wire.transactionId) {
      throw new Error(
        "Wire transfer is missing its linked transaction."
      );
    }

    /*
     * Generate the trace number before
     * completing the wire.
     */
    if (!wire.traceNumber) {
      wire.traceNumber =
        await generateWireTraceNumber();
    }

    /*
     * Put the wire into PROCESSING while
     * settlement is taking place.
     */
    wire.status = "PROCESSING";

    wire.processingStartedAt =
      wire.processingStartedAt ??
      new Date();

    if (adminId) {
      wire.processingBy =
        new Types.ObjectId(adminId);
    }

    /*
     * Verify the sender account.
     */
    const senderAccount =
      await Account.findOne({
        _id: wire.accountId,
        user: wire.userId,
        status: "ACTIVE",
      }).session(session);

    if (!senderAccount) {
      throw new Error(
        "Sender account not found or inactive."
      );
    }

    const totalDebit =
      wire.amount + wire.fee;

    /*
     * Debit the sender atomically.
     */
    const senderBefore =
      senderAccount.availableBalance;

    const updatedSender =
      await Account.findOneAndUpdate(
        {
          _id: senderAccount._id,
          user: wire.userId,
          status: "ACTIVE",
          availableBalance: {
            $gte: totalDebit,
          },
        },
        {
          $inc: {
            currentBalance:
              -totalDebit,

            availableBalance:
              -totalDebit,
          },
          $set: {
            lastActivityAt:
              new Date(),
          },
        },
        {
          returnDocument: "after",
          session,
        }
      );

    if (!updatedSender) {
      throw new Error(
        "Insufficient available funds."
      );
    }

    /*
     * Update the existing sender ledger
     * transaction created when the wire was
     * submitted.
     */
    await Transaction.findByIdAndUpdate(
      wire.transactionId,
      {
        $set: {
          status: "COMPLETED",

          balanceBefore:
            senderBefore,

          balanceAfter:
            updatedSender.availableBalance,

          postedAt: new Date(),

          fee: wire.fee,
        },
      },
      {
        session,
        returnDocument: "after",
      }
    );

    /*
     * INTERNAL APEX-TO-APEX WIRE
     *
     * If the wire creation service found
     * an active Apex destination account,
     * credit that account now.
     */
    if (wire.recipientAccountId) {
      const recipientAccount =
        await Account.findOne({
          _id:
            wire.recipientAccountId,

          user:
            wire.recipientUserId,

          status: "ACTIVE",
        }).session(session);

      if (!recipientAccount) {
        throw new Error(
          "Recipient account not found or inactive."
        );
      }

      /*
       * Prevent accidentally sending money
       * to the same account.
       */
      if (
        recipientAccount._id.toString() ===
        senderAccount._id.toString()
      ) {
        throw new Error(
          "Sender and recipient accounts must be different."
        );
      }

      const recipientBefore =
        recipientAccount.availableBalance;

      const recipientAfter =
        recipientBefore +
        wire.amount;

      recipientAccount.currentBalance +=
        wire.amount;

      recipientAccount.availableBalance +=
        wire.amount;

      recipientAccount.lastActivityAt =
        new Date();

      await recipientAccount.save({
        session,
      });

      /*
       * Create the recipient CREDIT
       * transaction.
       */
      await Transaction.create(
        [
          {
            user:
              wire.recipientUserId,

            account:
              recipientAccount._id,

            reference:
              wire.reference,

            type: "WIRE",

            direction: "CREDIT",

            status: "COMPLETED",

            amount:
              wire.amount,

            fee: 0,

            balanceBefore:
              recipientBefore,

            balanceAfter:
              recipientAfter,

            description:
              `Wire transfer from ${wire.senderName}`,

            merchant:
              wire.bankName,

            category:
              "Wire Transfer",

            location: "",

            counterpartyName:
              wire.senderName,

            counterpartyAccount:
              senderAccount.accountNumber,

            memo:
              wire.purpose ?? "",

            currency:
              recipientAccount.currency,

            postedAt: new Date(),
          },
        ],
        { session }
      );

      isInternal = true;

      recipientUserId =
        wire.recipientUserId
          ?.toString() ?? "";
    }

    /*
     * Complete the wire.
     */
    const now = new Date();

    wire.status = "COMPLETED";

    wire.completedAt = now;

    if (adminId) {
      wire.completedBy =
        new Types.ObjectId(adminId);
    }

    if (wire.notifications) {
      wire.notifications.completed =
        true;
    }

    wire.history.push({
      status: "COMPLETED",

      changedBy: adminId
        ? new Types.ObjectId(adminId)
        : undefined,

      actorType: "ADMIN",

      note: isInternal
        ? "Internal wire transfer settled successfully and recipient account credited."
        : "Wire transfer settled successfully.",

      createdAt: now,
    });

    await wire.save({
      session,
    });

    senderUserId =
      wire.userId.toString();

    amount = wire.amount;

    fee = wire.fee;

    reference = wire.reference;

    traceNumber =
      wire.traceNumber ?? "";

    wireIdString =
      wire._id.toString();

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    await session.endSession();
  }

  /*
   * Financial changes have committed.
   *
   * Notifications happen afterward so an
   * email/notification failure cannot roll
   * back the financial settlement.
   */
  try {
    await createNotification({
      user: senderUserId,

      title:
        "Wire Transfer Completed",

      message:
        `Your wire transfer of $${amount.toFixed(
          2
        )} has been completed successfully.`,

      type: "SUCCESS",

      category: "WIRE",

      actionUrl:
        `/dashboard/wires/${wireIdString}`,

      metadata: {
        wireId:
          wireIdString,

        reference,

        traceNumber,

        amount,

        fee,

        status: "COMPLETED",

        internalRecipient:
          isInternal,
      },
    });
  } catch (error) {
    console.error(
      "Sender wire notification failed:",
      error
    );
  }

  /*
   * Notify the internal recipient only.
   * External wires have no Apex recipient.
   */
  if (
    isInternal &&
    recipientUserId
  ) {
    try {
      await createNotification({
        user: recipientUserId,

        title:
          "Incoming Wire Transfer",

        message:
          `You received an incoming wire transfer of $${amount.toFixed(
            2
          )}.`,

        type: "SUCCESS",

        category: "WIRE",

        actionUrl:
          "/dashboard/transactions",

        metadata: {
          reference,

          traceNumber,

          amount,

          status: "COMPLETED",

          direction: "CREDIT",
        },
      });
    } catch (error) {
      console.error(
        "Recipient wire notification failed:",
        error
      );
    }
  }

  return {
    success: true as const,

    wireId: wireIdString,

    reference,

    traceNumber,

    status: "COMPLETED" as const,

    amount,

    fee,

    internalRecipient:
      isInternal,
  };
}