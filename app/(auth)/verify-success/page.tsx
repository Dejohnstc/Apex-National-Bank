import Link from "next/link";

export default function VerifySuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <span className="text-3xl">✓</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Email Verified
          </h1>

          <p className="mt-3 text-slate-600">
            Your Apex National Bank account has
            been successfully verified.
          </p>
        </div>

        <Link
          href="/login"
          className="block rounded-lg bg-emerald-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
        >
          Continue to Sign In
        </Link>
      </div>
    </main>
  );
}