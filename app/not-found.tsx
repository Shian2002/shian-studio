import Link from "next/link";

export default function NotFound() {
  return (
    <div role="main" className="flex min-h-screen flex-col items-center justify-center bg-th-bg text-th-text px-6">
      <h1 className="text-[8rem] font-bold leading-none tracking-tighter text-th-text/10">
        404
      </h1>
      <p className="mt-4 text-xl text-th-muted">Page not found</p>
      <p className="mt-2 text-sm text-th-subtle text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg border border-th-border bg-th-bg-s px-6 py-3 text-sm text-th-text2 transition-colors hover:border-accent/30 hover:bg-accent/5 hover:text-th-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
