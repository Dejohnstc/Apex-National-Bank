"use client";

import { ButtonHTMLAttributes } from "react";

type SubmitButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    text: string;
    loadingText?: string;
  };

export function SubmitButton({
  loading = false,
  text,
  loadingText = "Please wait...",
  className = "",
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      aria-busy={loading}
      className={[
        "flex w-full items-center justify-center",
        "rounded-xl px-4 py-3",
        "font-semibold text-white",
        "transition-all duration-200",
        "bg-emerald-600 hover:bg-emerald-700",
        "focus:outline-none focus:ring-4 focus:ring-emerald-100",
        "disabled:cursor-not-allowed disabled:opacity-70",
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? loadingText : text}
    </button>
  );
}