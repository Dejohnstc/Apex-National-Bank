"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  // ❌ REMOVED: the useEffect that set the "invalid link" message
  // ✅ Derived state instead:
  const noToken = !token;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!token) return; // safety net

    if (password.length < 8) {
      setIsError(true);
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsError(true);
        setMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setIsError(false);
      setMessage(data.message || "Password updated successfully!");
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setIsError(true);
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Reset Password
          </CardTitle>
          <CardDescription className="text-slate-500">
            Enter a new password for your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {success ? (
            <div className="space-y-4 text-center">
              <p className="text-sm p-3 rounded bg-green-50 text-green-700 border border-green-200">
                {message}
              </p>
              <p className="text-sm text-slate-500">
                Redirecting you to login...
              </p>
              <Link
                href="/login"
                className="text-blue-600 hover:underline font-medium text-sm"
              >
                Click here if you are not redirected
              </Link>
            </div>
          ) : (
            <>
              {/* Render the "invalid link" warning directly in JSX */}
              {noToken && (
                <div className="mb-4 text-sm p-3 rounded bg-red-50 text-red-600 border border-red-200">
                  Invalid reset link. Please request a new password reset email.
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || noToken}
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>

                {message && (
                  <p
                    className={`text-center text-sm p-3 rounded border ${
                      isError
                        ? "bg-red-50 text-red-600 border-red-200"
                        : "bg-green-50 text-green-600 border-green-200"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <div className="text-center text-sm pt-2">
                  <Link
                    href="/login"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          Loading...
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}