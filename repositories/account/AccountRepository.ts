import { Account } from "@/models/account/Account";

export class AccountRepository {
  static async findByUserId(userId: string) {
    return Account.find({ user: userId })
      .sort({ openedAt: 1 })
      .lean();
  }

  static async findById(accountId: string) {
    return Account.findById(accountId).lean();
  }

  static async findByAccountNumber(accountNumber: string) {
    return Account.findOne({ accountNumber }).lean();
  }

  static async updateBalances(
    accountId: string,
    availableBalance: number,
    currentBalance: number
  ) {
    return Account.findByIdAndUpdate(
      accountId,
      {
        availableBalance,
        currentBalance,
      },
      { new: true }
    );
  }
}