export default function CategoryLoading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading category page">
      <div className="full-bleed bg-surface pb-12 pt-10">
        <div className="site-container">
          <div className="mb-6 h-4 w-40 rounded bg-zinc-200" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="h-12 w-3/4 max-w-md rounded bg-zinc-200" />
              <div className="h-12 w-2/3 max-w-sm rounded bg-zinc-200" />
              <div className="h-20 w-full max-w-lg rounded bg-zinc-100" />
            </div>
            <div className="mx-auto h-[636px] w-full max-w-[521px] rounded-2xl bg-zinc-200 lg:ml-auto" />
          </div>
        </div>
      </div>
      <div className="site-container py-16">
        <div className="mx-auto mb-10 h-10 w-80 max-w-full rounded bg-zinc-200" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl bg-zinc-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
