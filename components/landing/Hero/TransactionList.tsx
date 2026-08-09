import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const transactions = [
  {
    title: "Payroll Deposit",
    amount: "+$4,200",
    icon: ArrowDownLeft,
    positive: true,
  },
  {
    title: "Apple Store",
    amount: "-$299",
    icon: ArrowUpRight,
    positive: false,
  },
  {
    title: "Netflix",
    amount: "-$15.99",
    icon: ArrowUpRight,
    positive: false,
  },
];

export function TransactionList() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <h3 className="font-semibold text-slate-900">
        Recent Activity
      </h3>

      <div className="mt-5 space-y-4">
        {transactions.map((tx) => {
          const Icon = tx.icon;

          return (
            <div
              key={tx.title}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-slate-100 p-2">
                  <Icon className="h-4 w-4" />
                </div>

                <span>{tx.title}</span>
              </div>

              <span
                className={
                  tx.positive
                    ? "font-semibold text-emerald-600"
                    : "font-semibold text-slate-900"
                }
              >
                {tx.amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}