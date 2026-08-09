"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  registerSchema,
  RegisterFormValues,
} from "@/lib/validation/auth";

import {
  FormInput,
  PasswordInput,
  FormCheckbox,
  SubmitButton,
} from "@/components/forms";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });
const router = useRouter();
 const onSubmit = async (
  data: RegisterFormValues
) => {
  try {
    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ??
          result.error?.message ??
          "Registration failed."
      );
    }

    toast.success(
      "Account created successfully! Please verify your email before signing in."
    );
window.dispatchEvent(
  new Event("refresh-notifications")
);
    router.push(
  `/verify-email?email=${encodeURIComponent(
    data.email
  )}`
);
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Registration failed."
    );
  }
};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          label="First Name"
          placeholder="John"
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <FormInput
          label="Last Name"
          placeholder="Doe"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <FormInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormInput
        label="Phone Number"
        placeholder="+1 (555) 123-4567"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <PasswordInput
        label="Password"
        placeholder="Create a password"
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <FormCheckbox
        error={errors.agree?.message}
        {...register("agree")}
      >
        I agree to the{" "}
        <Link
          href="/terms"
          className="font-medium text-emerald-600 hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-medium text-emerald-600 hover:underline"
        >
          Privacy Policy
        </Link>
      </FormCheckbox>

      <SubmitButton
        loading={isSubmitting}
        text="Create Account"
        loadingText="Creating Account..."
      />

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-emerald-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}