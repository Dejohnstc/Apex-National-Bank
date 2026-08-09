import { Transaction } from "@/models/transaction/Transaction";

export async function getTransactionStats() {
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const startOfYear = new Date(
    now.getFullYear(),
    0,
    1
  );

  const [
    todayStats,
    monthStats,
    yearStats,
  ] = await Promise.all([
    Transaction.aggregate([
      {
        $match: {
          status: "COMPLETED",
          postedAt: {
            $gte: startOfToday,
          },
        },
      },
      {
        $group: {
          _id: null,
          volume: {
            $sum: "$amount",
          },
          revenue: {
            $sum: "$fee",
          },
        },
      },
    ]),

    Transaction.aggregate([
      {
        $match: {
          status: "COMPLETED",
          postedAt: {
            $gte: startOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          volume: {
            $sum: "$amount",
          },
          revenue: {
            $sum: "$fee",
          },
        },
      },
    ]),

    Transaction.aggregate([
      {
        $match: {
          status: "COMPLETED",
          postedAt: {
            $gte: startOfYear,
          },
        },
      },
      {
        $group: {
          _id: null,
          volume: {
            $sum: "$amount",
          },
          revenue: {
            $sum: "$fee",
          },
        },
      },
    ]),
  ]);

  return {
    volume: {
      today: todayStats[0]?.volume ?? 0,
      month: monthStats[0]?.volume ?? 0,
      year: yearStats[0]?.volume ?? 0,
    },

    revenue: {
      today: todayStats[0]?.revenue ?? 0,
      month: monthStats[0]?.revenue ?? 0,
      year: yearStats[0]?.revenue ?? 0,
    },
  };
}