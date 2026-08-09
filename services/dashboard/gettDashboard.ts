import connectDB from "@/lib/db/connect";
import WireTransfer from "@/models/wire/WireTransfer";
import AchTransfer from "@/models/ach/AchTransfer";
import type {
  DashboardData,
  TransactionDirection,
  TransactionStatus,
  TransactionType,
} from "@/types";
import { getExchangeRates } from "@/services/exchange/getExchangeRates";
import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";
import { Transaction } from "@/models/transaction/Transaction";
import Notification from "@/models/notification/Notification";
interface DashboardInput {
  userId: string;
}

export async function getDashboard({
  userId,
}: DashboardInput): Promise<DashboardData> {
  await connectDB();

const [
  user,
  accounts,
  recentTransactions,
  pendingWires,
  pendingAchTransfers,
  notifications,
  exchangeRates,
] = await Promise.all([
  User.findById(userId).lean(),

  Account.find({
    user: userId,
  })
    .sort({ createdAt: 1 })
    .lean(),

  Transaction.find({
    user: userId,
  })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean(),

  WireTransfer.find({
    userId,
    status: {
      $in: ["PENDING", "PROCESSING"],
    },
  }).lean(),

  AchTransfer.find({
    userId,
    status: {
      $in: ["PENDING", "PROCESSING"],
    },
  }).lean(),

  Notification.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .lean(),

  getExchangeRates(),
]);

  if (!user) {
    throw new Error("User not found.");
  }

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.availableBalance,
    0
  );

  const dashboardAccounts = accounts.map(
    (account) => ({
      _id: account._id.toString(),

      accountNumber: account.accountNumber,

      type: account.type,

      availableBalance:
        account.availableBalance,

      currentBalance:
        account.currentBalance,
    })
  );

  const dashboardTransactions =
    recentTransactions.map(
      (transaction) => ({
        _id: transaction._id.toString(),

        reference:
          transaction.reference,

        description:
          transaction.description,

        amount:
          transaction.amount,

        direction:
          transaction.direction as TransactionDirection,

        type:
          transaction.type as TransactionType,

        status:
          transaction.status as TransactionStatus,

        createdAt:
          transaction.createdAt.toISOString(),
      })
    );
const dashboardPendingWires =
  pendingWires.map((wire) => ({
    id: wire._id.toString(),

    recipientName:
      wire.recipientName,

    amount:
      wire.amount,

    status:
      wire.status,

    createdAt:
      wire.createdAt.toISOString(),
  }));

const dashboardPendingAchTransfers =
  pendingAchTransfers.map((ach) => ({
    id: ach._id.toString(),

    recipientName:
      ach.recipientName,

    amount:
      ach.amount,

    status:
      ach.status,

    createdAt:
      ach.createdAt.toISOString(),
  }));

  const dashboardNotifications =
  notifications.map((notification) => ({
    id: notification._id.toString(),
    title: notification.title,
    message: notification.message,
    type: notification.type,
    actionUrl:
      notification.actionUrl ?? "",
    createdAt:
      notification.createdAt.toISOString(),
  }));

  return {
  customer: {
    firstName: user.firstName,
    lastName: user.lastName,
    customerId: user.customerId,
  },

  totalBalance,

  accounts: dashboardAccounts,

  recentTransactions:
    dashboardTransactions,

  pendingWires:
    dashboardPendingWires,

  pendingAchTransfers:
    dashboardPendingAchTransfers,
    notifications:
  dashboardNotifications,
  exchangeRates,
};
}