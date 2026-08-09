import { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({
  children,
}: AuthShellProps) {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {children}
      </div>
    </section>
  );
}