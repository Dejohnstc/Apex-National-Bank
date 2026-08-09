"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  useId,
} from "react";

type FormInputProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
  };

export const FormInput = forwardRef<
  HTMLInputElement,
  FormInputProps
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

        <input
          ref={ref}
          id={inputId}
          {...props}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : undefined
          }
          className={[
            "w-full rounded-xl border bg-white px-4 py-3",
            "text-slate-900 placeholder:text-slate-400",
            "transition-all duration-200",
            "focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 focus:outline-none",
            error
              ? "border-red-500"
              : "border-slate-300",
            className,
          ].join(" ")}
        />

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

FormInput.displayName = "FormInput";