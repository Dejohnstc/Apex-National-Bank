import Link from "next/link";

interface LogoProps {
  compact?: boolean;
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-90"
      aria-label="Apex National Bank"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Left leg */}
        <path
          d="M12 54L32 10L38 22L24 54H12Z"
          className="fill-emerald-600"
        />

        {/* Right leg */}
        <path
          d="M52 54L32 10L26 22L40 54H52Z"
          className="fill-slate-900 dark:fill-white"
        />

        {/* Crossbar */}
        <rect
          x="23"
          y="33"
          width="18"
          height="5"
          rx="2.5"
          className="fill-emerald-600"
        />
      </svg>

      {!compact && (
        <div className="leading-none">

  <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 bg-clip-text text-xl font-black tracking-tight text-transparent">

    APEX

  </div>

  <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.30em] text-slate-500">

    NATIONAL BANK

  </div>

</div>
      )}
    </Link>
  );
}