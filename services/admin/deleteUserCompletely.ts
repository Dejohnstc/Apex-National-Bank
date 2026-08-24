import mongoose from "mongoose";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";
import { Transaction } from "@/models/transaction/Transaction";

import WireTransfer from "@/models/wire/WireTransfer";
import UserTransferLimits from "@/models/user/UserTransferLimits";

import ScheduledTransfer from "@/models/transfer/ScheduledTransfer";
import Notification from "@/models/notification/Notification";

interface DeleteUserCompletelyInput {
  userId: string;
}

export async function deleteUserCompletely({
  userId,
}: DeleteUserCompletelyInput) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID.");
  }

  const session =
    await mongoose.startSession();

  try {
    const deletedCounts = {
      notifications: 0,
      scheduledTransfers: 0,
      wireTransfers: 0,
      transactions: 0,
      transferLimits: 0,
      accounts: 0,
      user: 0,
    };

    await session.withTransaction(
      async () => {
        const userObjectId =
          new mongoose.Types.ObjectId(
            userId
          );

        /*
         * Make sure the customer exists.
         */
        const user =
          await User.findById(
            userObjectId
          ).session(session);

        if (!user) {
          throw new Error(
            "User not found."
          );
        }

        /*
         * Delete notifications.
         */
        const notifications =
          await Notification.deleteMany(
            {
              user: userObjectId,
            },
            { session }
          );

        deletedCounts.notifications =
          notifications.deletedCount;

        /*
         * Delete scheduled transfers.
         */
        const scheduledTransfers =
          await ScheduledTransfer.deleteMany(
            {
              user: userObjectId,
            },
            { session }
          );

        deletedCounts.scheduledTransfers =
          scheduledTransfers.deletedCount;

        /*
         * Delete wire transfers.
         */
        const wireTransfers =
          await WireTransfer.deleteMany(
            {
              userId: userObjectId,
            },
            { session }
          );

        deletedCounts.wireTransfers =
          wireTransfers.deletedCount;

        /*
         * Delete transaction history.
         */
        const transactions =
          await Transaction.deleteMany(
            {
              user: userObjectId,
            },
            { session }
          );

        deletedCounts.transactions =
          transactions.deletedCount;

        /*
         * Delete customer-specific
         * transfer limits.
         */
        const transferLimits =
          await UserTransferLimits.deleteMany(
            {
              user: userObjectId,
            },
            { session }
          );

        deletedCounts.transferLimits =
          transferLimits.deletedCount;

        /*
         * Delete customer's accounts.
         */
        const accounts =
          await Account.deleteMany(
            {
              user: userObjectId,
            },
            { session }
          );

        deletedCounts.accounts =
          accounts.deletedCount;

        /*
         * Finally delete the user.
         */
        const deletedUser =
          await User.deleteOne(
            {
              _id: userObjectId,
            },
            { session }
          );

        deletedCounts.user =
          deletedUser.deletedCount;

        if (
          deletedUser.deletedCount !== 1
        ) {
          throw new Error(
            "Customer could not be deleted."
          );
        }
      }
    );

    return {
      success: true,
      message:
        "Customer and associated records deleted successfully.",
      deletedCounts,
    };
  } finally {
    await session.endSession();
  }
}