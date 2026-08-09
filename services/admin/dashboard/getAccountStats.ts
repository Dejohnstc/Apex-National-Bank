import { Account } from "@/models/account/Account";

export async function getAccountStats() {
  const [
    total,
    active,
    frozen,
    balances,
  ] = await Promise.all([
    Account.countDocuments(),

    Account.countDocuments({
      status: "ACTIVE",
    }),

    Account.countDocuments({
      status: "FROZEN",
    }),

    Account.aggregate([
      {
        $group: {
          _id: null,

          totalCurrentBalance: {
            $sum: "$currentBalance",
          },

          totalAvailableBalance: {
            $sum: "$availableBalance",
          },
        },
      },
    ]),
  ]);

  return {
    total,
    active,
    frozen,

    totalCurrentBalance:
      balances[0]?.totalCurrentBalance ?? 0,

    totalAvailableBalance:
      balances[0]?.totalAvailableBalance ?? 0,
  };
}