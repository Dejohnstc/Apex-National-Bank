"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            Forgot Password
          </CardTitle>
        </CardHeader>

        <CardContent>

          <form
            onSubmit={onSubmit}
            className="space-y-5"
          >

            <div>
              <Label>Email Address</Label>

              <Input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <Button
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </Button>

            {message && (
              <p className="text-center text-sm text-green-600">
                {message}
              </p>
            )}

            <div className="text-center text-sm">
              <Link
                href="/login"
                className="text-blue-600 hover:underline"
              >
                Back to Login
              </Link>
            </div>

          </form>

        </CardContent>
      </Card>
    </main>
  );
}