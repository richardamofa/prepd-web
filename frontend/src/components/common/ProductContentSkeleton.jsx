export default function ProductContentsSkeleton() {
  return (
    <section className="mt-24 border-t border-neutral-200 pt-20 animate-pulse">
      <div className="mb-12">
        <div className="h-3 w-28 rounded-full bg-neutral-200" />

        <div className="mt-4 h-10 w-72 rounded-full bg-neutral-200" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl bg-neutral-50 p-6"
          >
            <div className="h-48 rounded-2xl bg-neutral-200" />

            <div className="mt-6 h-3 w-8 rounded-full bg-neutral-200" />

            <div className="mt-4 h-6 w-40 rounded-full bg-neutral-200" />

            <div className="mt-4 space-y-2">
              <div className="h-3 rounded-full bg-neutral-200" />

              <div className="h-3 rounded-full bg-neutral-200" />

              <div className="h-3 w-2/3 rounded-full bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}