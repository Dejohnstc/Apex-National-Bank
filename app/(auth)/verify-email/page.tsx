"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Mail,
  RefreshCw,
} from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();

  const emailFromUrl =
    searchParams.get("email") ?? "";

  const [email, setEmail] =
    useState(emailFromUrl);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function resend() {
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/auth/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data =
        await response.json();

      setMessage(
        data.message ??
          "Verification email sent."
      );
    } catch {
      setMessage(
        "Unable to resend verification email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">

        <div className="flex justify-center">
          <CheckCircle2 className="h-20 w-20 text-green-600" />
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold">
          Account Created Successfully
        </h1>

        <p className="mt-4 text-center text-slate-600">
          Welcome to Apex National Bank.
        </p>

        <p className="mt-2 text-center text-slate-600">
          We&apos;ve sent a verification email to:
        </p>

        <div className="mt-5 flex items-center justify-center gap-2 rounded-lg border bg-slate-50 px-4 py-3">
          <Mail className="h-5 w-5 text-slate-500" />

          <span className="break-all text-center font-medium">
            {email || "No email provided"}
          </span>
        </div>

        <p className="mt-6 text-center text-sm leading-6 text-slate-500">
          Please click the verification link in
          your email before signing in. If you
          don&apos;t see it, check your Spam or Junk
          folder.
        </p>

        <button
          type="button"
          onClick={resend}
          disabled={loading || !email}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              loading
                ? "animate-spin"
                : ""
            }`}
          />

          {loading
            ? "Sending..."
            : "Resend Verification Email"}
        </button>

        <Link
          href="/login"
          className="mt-4 block w-full rounded-lg border py-3 text-center font-medium transition hover:bg-slate-100"
        >
          Back to Login
        </Link>

        {message && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-green-700">
            {message}
          </div>
        )}

      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
          <div className="text-sm text-slate-500">
            Loading...
          </div>
        </main>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}