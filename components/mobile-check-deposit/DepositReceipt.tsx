import type { CheckDeposit } from "@/types/check-deposit";

interface Props {
  deposit: CheckDeposit;
}

export default function DepositReceipt({
  deposit,
}: Props) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-2xl font-bold">
        Deposit Submitted
      </h2>

      <p className="mt-2 text-muted-foreground">
        Your mobile check deposit has been
        received and is awaiting review.
      </p>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span>Reference</span>

          <span className="font-medium">
            {deposit.reference}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Amount</span>

          <span className="font-medium">
            {new Intl.NumberFormat(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            ).format(deposit.amount)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Status</span>

          <span className="font-medium">
            {deposit.status.replaceAll(
              "_",
              " "
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Submitted</span>

          <span>
            {new Date(
              deposit.submittedAt
            ).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-md bg-muted p-4 text-sm">
        Funds are typically available
        within 1–2 business days after
        approval.
      </div>
    </div>
  );
}