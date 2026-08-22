import Skeleton from "@/components/ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <article>
      <Skeleton className="aspect-square rounded-4xl" />

      <div className="mt-5 space-y-3">
        <Skeleton className="h-3 w-24 rounded-full" />

        <Skeleton className="h-7 w-3/4" />

        <Skeleton className="h-4 w-20" />
      </div>
    </article>
  );
}