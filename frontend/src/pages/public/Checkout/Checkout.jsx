import { Check, MapPin, Store } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "@/context/CartContext";

import InstagramCheckoutModal from "@/components/common/InstagramCheckoutModal";
import { useToast } from "@/context/ToastContext";
import api from "@/services/api";
import { createInstagramOrderMessage } from "@/utils/createInstagramOrderMessage";

import { SOCIAL_LINKS } from "@/constants/socials";


import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Section from "@/components/ui/Section";

export default function Checkout() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    deliveryRequired: false,
    paymentMethod: "PAYSTACK",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeliveryToggle = (value) => {
    setFormData((current) => ({
      ...current,
      deliveryRequired: value,
      address: value ? current.address : "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.orders.create({
        customer: { fullName: formData.fullName, email: formData.email, phone: formData.phone },
        delivery: { required: formData.deliveryRequired, address: formData.deliveryRequired ? formData.address : null },
        paymentMethod: formData.paymentMethod,
        items: cartItems.map(({ id, quantity }) => ({ productId: id, quantity })),
      });
      clearCart();
      showToast("Order created successfully.", "success");
      if (formData.paymentMethod === "PAYSTACK") {
        try {
          const payment = await api.payments.initializePaystack(response.data.reference, formData.email);
          window.location.assign(payment.data.authorization_url);
          return;
        } catch (paymentError) {
          setError(paymentError.message || "Payment initialization is unavailable. Your order remains pending.");
          showToast("Your order is saved, but payment setup is unavailable.", "info");
        }
      }
      navigate(`/checkout/confirmation?reference=${response.data.reference}`);
    } catch (error) {
      // console.error(error);
      setError(
        "Something went wrong while preparing your order. Please try again.",
      );
      showToast(error.message || "We couldn't prepare your order.", "error");
    } finally {
      setLoading(false);
    }
  };


  const [instagramModalOpen, setInstagramModalOpen] =
  useState(false);

const [instagramOrder, setInstagramOrder] =
  useState(null);

const handleInstagramCheckout = async () => {
  if (
    !formData.fullName ||
    !formData.email ||
    !formData.phone
  ) {
    setError(
      "Please fill in your name, email, and phone number before continuing.",
    );

    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await api.orders.create({
      customer: formData,
      delivery: { required: formData.deliveryRequired, address: formData.address || null },
      paymentMethod: "INSTAGRAM",
      items: cartItems.map(({ id, quantity }) => ({ productId: id, quantity })),
    });
    const data = response.data;

    const orderMessage = createInstagramOrderMessage({
      reference: data.reference,
      customer: formData,
      cartItems,
      cartTotal,
    });

    try {
      await navigator.clipboard.writeText(orderMessage);
    } catch (clipboardError) {
      void clipboardError;
    }

    setInstagramOrder({
      reference: data.reference,
      message: orderMessage,
    });

    setInstagramModalOpen(true);
    clearCart();
    showToast("Instagram order created. Details have been processed and sent!.", "success");
  } catch (error) {
    // console.error(error);
    setError(
      "We couldn't prepare your order. Please try again.",
    );
    showToast(error.message || "We couldn't prepare your Instagram order.", "error");
  } finally {
    setLoading(false);
  }
};

  if (cartItems.length === 0) {
    return (
      <main className="pt-24">
        <Navbar />
        <Section className="py-32 text-center">
          <h1 className="text-4xl font-black">
            Your cart is empty.
          </h1>

          <p className="mt-4 text-neutral-600">
            Add something to your cart before checking out.
          </p>

          <Link
            to="/shop"
            className="mt-10 inline-flex items-center rounded-full bg-black px-7 py-4 font-semibold text-white! transition hover:bg-neutral-800"
          >
            Return to Shop
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
          <Link
            to="/cart"
            className="text-sm font-semibold underline underline-offset-4 text-neutral-600 hover:text-black transition"
          >
            ← Back to Cart
          </Link>

          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Checkout
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight">
            Let's get you PREP'D.
          </h1>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
          {/* Checkout Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Full Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>

              <input
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email Address
              </label>

              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Phone Number
              </label>

              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+233 XX XXX XXXX"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Delivery Options */}

            <div>
              <label className="mb-3 block text-sm font-semibold">
                How would you like to receive your order?
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Pickup */}

                <button
                  type="button"
                  onClick={() =>
                    handleDeliveryToggle(false)
                  }
                  className={`relative rounded-2xl border p-5 text-left transition ${
                    !formData.deliveryRequired
                      ? "border-black bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  {!formData.deliveryRequired && (
                    <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                      <Check size={13} />
                    </span>
                  )}

                  <Store size={22} />

                  <p className="mt-4 font-semibold">
                    Pickup
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Pick up your order from the designated location.
                  </p>
                </button>

                {/* Delivery */}

                <button
                  type="button"
                  onClick={() =>
                    handleDeliveryToggle(true)
                  }
                  className={`relative rounded-2xl border p-5 text-left transition ${
                    formData.deliveryRequired
                      ? "border-black bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  {formData.deliveryRequired && (
                    <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                      <Check size={13} />
                    </span>
                  )}

                  <MapPin size={22} />

                  <p className="mt-4 font-semibold">
                    I need delivery
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Have your PREP'D box delivered to you.
                  </p>
                </button>
              </div>
            </div>

            {/* Delivery Location */}

            {formData.deliveryRequired && (
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Delivery Location
                </label>

                <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter your delivery location..."
                  className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
                />

                <p className="mt-2 text-sm text-neutral-500">
                  Please provide a clear location, area, landmark, or any
                  information that will help us find you.
                </p>
              </div>
            )}

            {/* Payment */}

            <div>
              <label className="mb-3 block text-sm font-semibold">
                Payment Method
              </label>

              {/*<label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 p-4 transition hover:border-black">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paystack"
                  checked={
                    formData.paymentMethod === "paystack"
                  }
                  onChange={handleChange}
                />

                <div>
                  <p className="font-semibold">
                    Pay with Paystack
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Secure payment with card, mobile money, or other available
                    options.
                  </p>
                </div>
              </label>*/}
            </div>

            {/*<div className="relative flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-neutral-200" />

              <span className="text-xs uppercase tracking-widest text-neutral-400">
                Or
              </span>

              <div className="h-px flex-1 bg-neutral-200" />
            </div>*/}

            <button
              type="button"
              onClick={handleInstagramCheckout}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-black bg-white px-6 py-4 font-semibold text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Checking Out...
                </>
              ) : (
                "Checkout via Instagram"
              )}
            </button>

            <p className="text-center text-sm text-neutral-500">
              Have questions or want to customize your order? Chat with us directly on
              Instagram @<a href="https://www.instagram.com/prepd_26/" target="_blank" className="text-blue">prepd_26</a>
            </p>

            {/* Error */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}

            {/*<button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black px-6 py-4 font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Preparing Order..."
                : `Pay GH₵ ${Number(cartTotal).toFixed(2)}`}
            </button>*/}
          </form>

          {/* Order Summary */}

          <aside className="h-fit rounded-3xl bg-neutral-50 p-7">
            <h2 className="text-2xl font-black">
              Your Order
            </h2>

            <div className="mt-8 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id || item.slug}
                  className="flex gap-4"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-1 justify-between gap-4">
                    <div>
                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      GH₵{" "}
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between border-t border-neutral-200 pt-6 text-lg font-bold">
              <span>Total</span>

              <span>
                GH₵ {Number(cartTotal).toFixed(2)}
              </span>
            </div>
          </aside>
        </div>
      </Section>

      <Footer />
      <InstagramCheckoutModal
        isOpen={instagramModalOpen}
        orderReference={instagramOrder?.reference}
        orderMessage={instagramOrder?.message}
        onClose={() => setInstagramModalOpen(false)}
        onOpenInstagram={() => {
          window.open(
            `https://ig.me/m/${SOCIAL_LINKS.instagram}`,
            "_blank",
          );
        }}
      />
    </main>
  );
}