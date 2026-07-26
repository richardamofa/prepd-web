import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="group">
      <Link
        to={`/shop/${product.slug}`}
        className="block overflow-hidden rounded-4xl bg-neutral-100"
      >
        <div className="flex aspect-square items-center justify-center p-10 transition-transform duration-500 group-hover:scale-[1.03]">
          <img
            src={product.image}
            alt={product.name}
            className="w-100 max-w-sm object-contain"
          />
        </div>
      </Link>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="text-sm text-neutral-500">
            {product.category}
          </p>

          <h2 className="mt-1 text-xl font-bold">
            {product.name}
          </h2>

          <p className="mt-2 text-sm text-neutral-600">
            {product.currency} {product.price}
          </p>
        </div>

        <Link
          to={`/shop/${product.slug}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black border border-neutral-200 transition hover:bg-neutral-700!"
        >
          <ArrowRight size={18} className="text-white!" />
        </Link>
      </div>
    </article>
  );
}