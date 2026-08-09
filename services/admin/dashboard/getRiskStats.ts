import { Transaction } from "@/models/transaction/Transaction";
import AchTransfer from "@/models/ach/AchTransfer";
import WireTransfer from "@/models/wire/WireTransfer";

export async function getRiskStats() {
  const [
    achFlagged,
    wireFlagged,
    failedTransactions,
  ] = await Promise.all([
    AchTransfer.countDocuments({
      "risk.flagged": true,
    }),

    WireTransfer.countDocuments({
      "risk.flagged": true,
    }),

    Transaction.countDocuments({
      status: "FAILED",
    }),
  ]);

  /**
   * TODO:
   * Once the ACH and Wire schemas support:
   *
   * risk.reviewStatus
   * aml.status
   *
   * replace these placeholders with real queries.
   */
  const pendingReview = 0;
  const amlQueue = 0;

  return {
    flagged: achFlagged + wireFlagged,
    failed: failedTransactions,
    pendingReview,
    amlQueue,
  };
}