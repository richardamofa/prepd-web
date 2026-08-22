import { useEffect, useState } from "react";

import ProductCard from "@/components/common/ProductCard";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";
import Section from "@/components/ui/Section";

import api from "@/services/api";

export default function ProductCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const response = await api.products.getAll();

        if (!mounted) return;

        setProducts(response.data || []);
      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error
        );

        if (!mounted) return;

        setError(
          "We couldn't load our products right now. Please try again in a moment."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Section>
      <div
        className="mb-12 flex items-end justify-between"
        id="product-collection"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Shop PREP'D
          </p>

          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            Find your essentials.
          </h2>
        </div>

        <p className="hidden max-w-xs text-right text-sm leading-6 text-neutral-500 md:block">
          Carefully selected essentials to help you start strong.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-lg font-semibold text-red-700">
            Unable to load products
          </p>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </Section>
  );
}