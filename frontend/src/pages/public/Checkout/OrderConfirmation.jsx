import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Section from "@/components/ui/Section";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const reference = params.get("reference");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!reference) return;
    api.orders.getByReference(reference)
      .then((response) => setOrder(response.data))
      .catch((loadError) => setError(loadError.message || "Unable to load order details."));
  }, [reference]);
  return (
    <main className="pt-24">
      <Navbar />
      <Section className="py-32 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Order received</p>
        <h1 className="mt-5 text-5xl font-black">You're all PREP'D.</h1>
        <p className="mx-auto mt-6 max-w-lg text-neutral-600">Your order reference is <strong>{reference || "pending"}</strong>. Payment status: <strong>{order?.paymentStatus || "PENDING"}</strong>. We will contact you with the next fulfilment step.</p>
        {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
        {order && <div className="mx-auto mt-10 max-w-xl space-y-3 text-left">
          {order.items.map((item) => <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-neutral-200 p-3">
            <img src={item.product?.images?.[0]?.src || "/images/placeholders/product-placeholder.png"} alt={item.productName} className="h-16 w-16 rounded-xl bg-neutral-100 object-contain p-2" />
            <div className="flex-1"><p className="font-semibold">{item.productName}</p><p className="text-sm text-neutral-500">Quantity: {item.quantity}</p></div>
            <p className="font-semibold">{order.currency} {Number(item.totalPrice).toFixed(2)}</p>
          </div>)}
        </div>}
        <Link to="/shop" className="mt-10 inline-flex rounded-full bg-black px-7 py-4 font-semibold text-white!">Continue shopping</Link>
      </Section>
      <Footer />
    </main>
  );
}