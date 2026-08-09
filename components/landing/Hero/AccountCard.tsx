export function AccountCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <p className="text-sm text-slate-500">
        Available Balance
      </p>

      <h2 className="mt-2 text-4xl font-bold text-slate-900">
        $24,580.45
      </h2>

      <div className="mt-5 flex items-center gap-2">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
          +12.4%
        </span>

        <span className="text-sm text-slate-500">
          This month
        </span>
      </div>
    </div>
  );
}