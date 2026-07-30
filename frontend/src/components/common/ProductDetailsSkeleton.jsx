export default function ProductDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-16 lg:grid-cols-2">
        {/* Gallery */}

        <div>
          <div className="aspect-square rounded-4xl bg-[linear-gradient(90deg,#f5f5f5_25%,#e5e5e5_50%,#f5f5f5_75%)]
            bg-size-[1000px_100%]
            animate-shimmer" />

          <div className="mt-4 grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-neutral-200"
              />
            ))}
          </div>
        </div>

        {/* Info */}

        <div className="space-y-6">
          <div className="h-4 w-32 rounded-full bg-neutral-200" />

          <div className="h-12 w-3/4 rounded-full bg-neutral-200" />

          <div className="h-8 w-24 rounded-full bg-neutral-200" />

          <div className="space-y-3">
            <div className="h-4 rounded-full bg-neutral-200" />

            <div className="h-4 rounded-full bg-neutral-200" />

            <div className="h-4 w-5/6 rounded-full bg-neutral-200" />
          </div>

          <div className="h-14 w-full rounded-2xl bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}