"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = React.ComponentProps<typeof Button>;

/**
 * A form-safe Button that guarantees `type="submit"` is passed
 * to the underlying <button> element.
 *
 * Base UI's ButtonPrimitive does not reliably forward `type` as
 * "submit" inside a plain <form onSubmit>, so we force it here.
 */
export function SubmitButton({
  type = "submit",
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      {...props}
      type={type}
      // Base UI's ButtonPrimitive may still override this internally;
      // the spread below ensures the DOM node ends up with type="submit".
      {...({ type } as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}