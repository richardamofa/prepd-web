import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import ProductContents from "@/components/common/ProductContents";
import ProductGallery from "@/components/common/ProductGallery";
import ProductInfo from "@/components/common/ProductInfo";

import Section from "@/components/ui/Section";

import { products } from "@/constants/product";

import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";

export default function ProductDetails() {
  const { slug } = useParams();

  const product = products.find(
    (item) => item.slug === slug,
  );

  if (!product) {
    return (
      <Section className="pt-40 text-center">
        <h1 className="text-4xl font-black">
          Product not found.
        </h1>

        <Link
          to="/shop#product-collection"
          className="mt-6 inline-block underline"
        >
          Return to Shop
        </Link>
      </Section>
    );
  }

  return (
    <main className="pt-24">
    <Navbar />
      <Section>
        {/* Back to Shop */}
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

        {/* Product Main Section */}
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <ProductGallery
            images={product.images}
          />

          <ProductInfo
            product={product}
          />
        </div>

        <ProductContents
          items={product.items}
        />
      </Section>

      <Footer />
    </main>
  );
}