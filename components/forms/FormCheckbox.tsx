"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  useId,
} from "react";

type FormCheckboxProps =
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type"
  > & {
    error?: string;
    children: React.ReactNode;
  };

export const FormCheckbox = forwardRef<
  HTMLInputElement,
  FormCheckboxProps
>(
  (
    {
      error,
      children,
      id,
      className = "",
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
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : undefined
            }
            className={[
              "mt-1 h-4 w-4 rounded border-slate-300",
              "text-emerald-600",
              "focus:ring-2 focus:ring-emerald-500",
              className,
            ].join(" ")}
            {...props}
          />

          <span className="text-sm leading-6 text-slate-600">
            {children}
          </span>
        </label>

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

FormCheckbox.displayName = "FormCheckbox";