import Skeleton from "../ui/Skeleton";
export default function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-16 lg:grid-cols-2">
        {/* Gallery */}

        <Skeleton className="aspect-square rounded-4xl" />

        <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
                <Skeleton
                    key={i}
                    className="aspect-square rounded-xl"
                />
            ))}
        </div>

        {/* Info */}

        <div className="grid gap-16 lg:grid-cols-2">

            <Skeleton className="aspect-square rounded-4xl" />

            <div className="space-y-5">

                <Skeleton className="h-4 w-28 rounded-full" />

                <Skeleton className="h-12 w-5/6" />

                <Skeleton className="h-6 w-24" />

                <Skeleton className="h-4 w-full" />

                <Skeleton className="h-4 w-11/12" />

                <Skeleton className="h-4 w-10/12" />

                <Skeleton className="mt-8 h-14 w-44 rounded-2xl" />

            </div>

        </div>
      </div>
    </div>
  );
}