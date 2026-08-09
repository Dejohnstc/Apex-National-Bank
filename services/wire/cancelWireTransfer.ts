import mongoose from "mongoose";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import WireTransfer from "@/models/wire/WireTransfer";

import { creditAccount } from "@/services/account/creditAccount";
import { createNotification } from "@/services/notification/createNotification";
import { createTransaction } from "@/services/transaction/createTransaction";
import { updateTransactionStatus } from "@/services/transaction/updateTransactionStatus";

import { updateWireStatus } from "./updateWireStatus";

export async function cancelWireTransfer(
  reference: string
) {
  await dbConnect();

  const authSession = await auth();

  if (!authSession?.user?.id) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const wire = await WireTransfer.findOne(
      {
        reference,
        userId: authSession.user.id,
      },
      null,
      { session }
    );

    if (!wire) {
      throw new Error(
        "Wire transfer not found."
      );
    }

    if (wire.status !== "PENDING") {
      throw new Error(
        "Only pending wire transfers may be cancelled."
      );
    }

    const refund = await creditAccount(
      wire.accountId.toString(),
      wire.amount,
      session
    );

    const updatedWire =
      await updateWireStatus({
        wireId: wire._id.toString(),

        status: "CANCELLED",

        changedBy:
          new mongoose.Types.ObjectId(
            authSession.user.id
          ),

        actorType: "CUSTOMER",

        note: "Customer cancelled wire transfer.",

        reason:
          "Cancelled by customer before processing.",

        session,
      });

   if (!wire.transactionReference) {
  throw new Error(
    "Wire transfer is missing its transaction reference."
  );
}

await updateTransactionStatus({
  reference: wire.transactionReference,

  status: "CANCELLED",

  session,
});

    await createTransaction({
      user: wire.userId.toString(),

      account:
        wire.accountId.toString(),

      reference: `${wire.reference}-CANCEL`,

      type: "WIRE",

      direction: "CREDIT",

      amount: wire.amount,

      balanceBefore:
        refund.balanceBefore,

      balanceAfter:
        refund.balanceAfter,

      description:
        "Wire transfer cancellation refund",

      status: "COMPLETED",

      counterpartyName:
        wire.recipientName,

      counterpartyAccount: `****${wire.accountNumber.slice(
        -4
      )}`,

      memo:
        "Wire transfer cancelled by customer",

      metadata: {
        transferId: wire.reference,
        externalReference:
          wire.reference,
      },

      session,
    });

    await createNotification({
      user: wire.userId.toString(),

      title: "Wire Transfer Cancelled",

      message:
        "Your wire transfer has been cancelled and the funds have been returned to your account.",

      type: "INFO",

      actionUrl: `/dashboard/wires/${wire.reference}`,

      session,
    });

    await session.commitTransaction();

    return {
      success: true,
      wire: updatedWire,
    };
  } catch (error) {
    await session.abortTransaction();

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to cancel wire transfer.",
    };
  } finally {
    await session.endSession();
  }
}