"use client";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: Props) {
  return (
    <div className="rounded-lg border p-8 text-center">
      <h2 className="text-xl font-semibold">
        Unable to load bill payments
      </h2>

      <p className="mt-2 text-muted-foreground">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-md border px-4 py-2"
      >
        Try Again
      </button>
    </div>
  );
}