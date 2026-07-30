export default function ProductCardSkeleton() {
  return (
    <article className="animate-pulse">
      <div className="overflow-hidden rounded-4xl bg-[linear-gradient(90deg,#f5f5f5_25%,#e5e5e5_50%,#f5f5f5_75%)]
        bg-size-[1000px_100%]
        animate-shimmer">
        <div className="aspect-square bg-neutral-200" />
      </div>

      <div className="mt-5 space-y-3">
        <div className="h-3 w-24 rounded-full bg-neutral-200" />

        <div className="h-6 w-3/4 rounded-full bg-neutral-200" />

        <div className="h-4 w-20 rounded-full bg-neutral-200" />
      </div>
    </article>
  );
}