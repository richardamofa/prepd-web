import { useEffect, useState } from "react";

import ProductCard from "@/components/common/ProductCard";
import Section from "@/components/ui/Section";

import { fallbackProducts } from "@/data/fallbackProducts";
import api from "@/services/api";

export default function ProductCollection() {
  const [products, setProducts] = useState(fallbackProducts);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const response = await api.products.getAll();

        if (!mounted) return;

        setProducts(response.data || []);
      } catch {
        if (!mounted) return;

        setError("Showing our saved product list while the catalogue reconnects.");
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

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {error && (
        <p className="mt-6 text-center text-sm text-neutral-500">{error}</p>
      )}
    </Section>
  );
}