import {
  ArrowRightLeft,
  CreditCard,
  PiggyBank,
  Wallet,
} from "lucide-react";

const actions = [
  {
    label: "Transfer",
    icon: ArrowRightLeft,
  },
  {
    label: "Cards",
    icon: CreditCard,
  },
  {
    label: "Savings",
    icon: PiggyBank,
  },
  {
    label: "Wallet",
    icon: Wallet,
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Icon className="mx-auto h-6 w-6 text-emerald-600" />

            <p className="mt-3 text-sm font-medium">
              {action.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}