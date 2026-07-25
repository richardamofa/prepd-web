import { Check, MapPin, Store } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "@/context/CartContext";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Section from "@/components/ui/Section";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    deliveryRequired: false,
    paymentMethod: "paystack",
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
      const orderData = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },

        delivery: {
          required: formData.deliveryRequired,
          address: formData.deliveryRequired
            ? formData.address
            : null,
        },

        paymentMethod: formData.paymentMethod,

        items: cartItems,

        total: cartTotal,
      };

      console.log("Order:", orderData);

      /*
        Later:

        const response = await fetch(
          "YOUR_BACKEND_URL/api/orders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          }
        );

        const data = await response.json();

        // Initialize Paystack using the returned reference
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1000),
      );

      alert("Order ready for payment.");

      navigate("/shop");
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while preparing your order. Please try again.",
      );
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
            className="mt-6 inline-block font-semibold underline underline-offset-4 text-white!"
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

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 p-4 transition hover:border-black">
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
              </label>
            </div>

            {/* Error */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black px-6 py-4 font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Preparing Order..."
                : `Pay GH₵ ${Number(cartTotal).toFixed(2)}`}
            </button>
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
    </main>
  );
}