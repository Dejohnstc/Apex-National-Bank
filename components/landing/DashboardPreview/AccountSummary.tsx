import { accounts } from "./data";

export function AccountSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {accounts.map((account) => (
        <div
          key={account.name}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <p className="text-sm text-slate-500">
            {account.name}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {account.balance}
          </h3>
        </div>
      ))}
    </div>
  );
}