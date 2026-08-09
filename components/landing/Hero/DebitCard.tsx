export function DebitCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium opacity-80">
          Apex National Bank
        </span>

        <div className="h-8 w-12 rounded-md bg-yellow-400/80" />
      </div>

      <div className="mt-12 text-2xl font-semibold tracking-[0.3em]">
        •••• •••• •••• 4582
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase opacity-70">
            Card Holder
          </p>

          <p className="font-semibold">
            Alex Johnson
          </p>
        </div>

        <div>
          <p className="text-xs uppercase opacity-70">
            Expires
          </p>

          <p className="font-semibold">
            08/31
          </p>
        </div>
      </div>
    </div>
  );
}