'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-xl font-semibold text-zinc-900">Something went wrong</h1>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white"
      >
        Try again
      </button>
    </div>
  );
}
