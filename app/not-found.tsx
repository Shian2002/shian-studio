import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white">
      <h1 className="text-[8rem] font-bold leading-none tracking-tighter text-white/10">
        404
      </h1>
      <p className="mt-4 text-xl text-gray-400">Page not found</p>
      <p className="mt-2 text-sm text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm text-gray-300 transition-colors hover:border-white/20 hover:bg-white/10"
      >
        Back to Home
      </Link>
    </div>
  );
}
