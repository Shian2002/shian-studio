"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white">
      <h1 className="text-4xl font-bold text-red-400">Something went wrong</h1>
      <p className="mt-4 text-gray-400">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm text-gray-300 transition-colors hover:border-white/20 hover:bg-white/10"
      >
        Try again
      </button>
    </div>
  );
}
