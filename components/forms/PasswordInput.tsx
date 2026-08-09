"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  useId,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

type PasswordInputProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
  };

export const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      label,
      error,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700"
        >
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            {...props}
            type={show ? "text" : "password"}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : undefined
            }
            className={[
              "w-full rounded-xl border bg-white px-4 py-3 pr-12",
              "text-slate-900 placeholder:text-slate-400",
              "transition-all duration-200",
              "focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 focus:outline-none",
              error
                ? "border-red-500"
                : "border-slate-300",
              className,
            ].join(" ")}
          />

          <button
            type="button"
            onClick={() =>
              setShow((prev) => !prev)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
            aria-label={
              show
                ? "Hide password"
                : "Show password"
            }
          >
            {show ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName =
  "PasswordInput";