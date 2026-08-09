"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormValues,
} from "@/lib/validation/auth";

import {
  FormInput,
  PasswordInput,
  SubmitButton,
} from "@/components/forms";

export function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
  data: LoginFormValues
) => {
  try {
    setLoading(true);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!result) {
      throw new Error(
        "Unable to sign in. Please try again."
      );
    }

    if (result.error) {
      throw new Error(result.error);
    }

    // Fetch the authenticated session
    const response = await fetch("/api/auth/session");
    const session = await response.json();

    if (session?.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }

    router.refresh();
  } catch (error) {
    console.error(error);

    alert(
      error instanceof Error
        ? error.message
        : "Login failed."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <FormInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between text-sm">
        <Link
          href="/forgot-password"
          className="font-medium text-emerald-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <SubmitButton
        loading={loading}
        text="Sign In"
        loadingText="Signing In..."
      />

      <p className="text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-emerald-600 hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}