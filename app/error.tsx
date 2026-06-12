"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert" className="flex min-h-screen flex-col items-center justify-center bg-th-bg text-th-text px-6">
      <h1 className="text-4xl font-bold text-red-400">Something went wrong</h1>
      <p className="mt-4 text-th-muted text-center max-w-md">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 rounded-lg border border-th-border bg-th-bg-s px-6 py-3 text-sm text-th-text2 transition-colors hover:border-accent/30 hover:bg-accent/5 hover:text-th-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Try again
      </button>
    </div>
  );
}
