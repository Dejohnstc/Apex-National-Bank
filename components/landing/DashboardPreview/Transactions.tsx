import { transactions } from "./data";

export function Transactions() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <h3 className="font-semibold text-slate-900">
        Recent Activity
      </h3>

      <div className="mt-5 space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium">
                {transaction.merchant}
              </p>

              <p className="text-sm text-slate-500">
                {transaction.date}
              </p>
            </div>

            <span
              className={
                transaction.amount > 0
                  ? "font-semibold text-emerald-600"
                  : "font-semibold text-slate-900"
              }
            >
              {transaction.amount > 0 ? "+" : ""}
              ${Math.abs(transaction.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}