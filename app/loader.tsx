export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center">

        {/* Logo */}

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 shadow-xl">
          <span className="text-3xl font-bold text-white">
            A
          </span>
        </div>

        {/* Brand */}

        <h1 className="mt-5 text-xl font-bold tracking-wide text-white">
          APEX
        </h1>

        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400">
          National Bank
        </p>

        {/* Loader */}

        <div className="mt-8 flex items-center gap-3">

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-emerald-400" />

          <span className="text-sm text-slate-400">
            Loading...
          </span>

        </div>

      </div>
    </div>
  );
}