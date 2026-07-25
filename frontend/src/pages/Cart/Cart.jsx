import { ArrowRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "@/context/CartContext";

import Section from "@/components/ui/Section";

import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";


export default function Cart() {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = Number(cartTotal.toFixed(2));
  const estimatedTax = Number((subtotal * 0.075).toFixed(2));
  const total = Number((subtotal + estimatedTax).toFixed(2));

  if (cartItems.length === 0) {
    return (
      <main className="pt-24">
        <Navbar />
        <Section className="py-32 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Your Cart
          </p>

          <h1 className="mt-5 text-5xl font-black">
            Your cart is empty.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-neutral-600">
            Looks like you haven't added anything to your PREP'D box yet.
          </p>

          <Link
            to="/shop"
            className="mt-10 inline-flex items-center rounded-full bg-black px-7 py-4 font-semibold text-white! transition hover:bg-neutral-800"
          >
            Shop PREP'D
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </Section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="pt-24">
    <Navbar />
      <Section>
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Your Cart
          </p>

          <h1 className="mt-4 text-5xl font-black">
            Ready to get PREP'D?
          </h1>

          <Link
            to="/shop"
            className="mt-4 inline-flex items-center text-sm font-semibold text-black transition hover:text-neutral-600"
          >
            ← Back to Shop
          </Link>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_360px]">
          {/* Cart Items */}

          <div className="space-y-6">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="flex gap-5 rounded-3xl border border-neutral-200 p-5"
              >
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h2 className="font-bold">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-neutral-500">
                        {item.currency} {item.price}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="text-neutral-400 transition hover:text-black"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1,
                        )
                      }
                      className="h-8 w-8 rounded-full border"
                    >
                      −
                    </button>

                    <span className="text-sm font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1,
                        )
                      }
                      className="h-8 w-8 rounded-full border"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Summary */}

          <div className="h-fit rounded-3xl bg-neutral-50 p-7">
            <h2 className="text-2xl font-black">
              Order Summary
            </h2>

            <div className="mt-8 space-y-3 border-b border-neutral-200 pb-5">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-summary`}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <span className="text-neutral-600">
                    {item.name} × {item.quantity}
                  </span>

                  <span className="font-medium text-neutral-900">
                    GH₵ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between pt-2 text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold">GH₵ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Estimated VAT/Tax</span>
                <span className="font-semibold">GH₵ {estimatedTax.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-between text-lg font-bold">
              <span>Total</span>

              <span>
                GH₵ {total.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-8 flex items-center justify-center rounded-full bg-black px-6 py-4 font-semibold text-white! transition hover:bg-neutral-800"
            >
              Proceed to Checkout
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
        
      </Section>
      <Footer />
    </main>
  );
}