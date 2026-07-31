import ProductContents from "@/components/common/ProductContents";
import ProductDetailSkeleton from "@/components/common/ProductDetailSkeleton";
import ProductGallery from "@/components/common/ProductGallery";
import ProductInfo from "@/components/common/ProductInfo";
import api from "@/services/api";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response =
          await api.products.getBySlug(slug);

        setProduct(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch product:",
          error,
        );

        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-40">
          <ProductDetailSkeleton />
        </main>

        <Footer />
      </>
    );
  }
console.log(product);
console.log(product.images);
  if (error || !product) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-20">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold transition hover:underline"
          >
            <ArrowLeft size={16} />

            Back to Shop
          </Link>

          <div className="py-32 text-center">
            {error || "Product not found"}
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-40">
        <Link
          to="/shop"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-black"
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          Back to Shop
        </Link>

        <div className="grid gap-16 lg:grid-cols-2">
          <ProductGallery
            images={product.images || []}
          />

          <ProductInfo
            product={product}
          />
        </div>

        <ProductContents
          items={product.items || []}
        />
      </main>

      <Footer />
    </>
  );
}