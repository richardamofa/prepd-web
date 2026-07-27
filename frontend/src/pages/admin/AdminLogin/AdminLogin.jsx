import api from "@/services/api";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "@/components/common/Logo";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await api.auth.login(formData);

    localStorage.setItem(
      "adminToken",
      response.data.token,
    );

    localStorage.setItem(
      "admin",
      JSON.stringify(response.data.admin),
    );

    navigate("/admin/dashboard");
  } catch (error) {
    console.error(error);

    setError(
      error.message ||
        "Unable to sign in. Please check your credentials and try again.",
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <section className="hidden bg-black p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <Logo className="h-10 invert" />

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              PREP'D Admin
            </p>

            <h1 className="mt-6 max-w-xl text-6xl font-black leading-[0.95] tracking-tight xl:text-8xl">
              Hey Twin
              <br />
              GET PREP'D
            </h1>

            <p className="mt-8 max-w-md text-lg leading-8 text-neutral-400">
              Manage orders, products, customizations, and everything that
              keeps PREP'D moving.
            </p>
          </div>

          <p className="text-sm text-neutral-500">
            PREP'D Admin Portal
          </p>
        </section>

        {/* Right Side */}
        <section className="flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <Logo className="h-10" />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Admin Portal
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Welcome back.
              </h2>

              <p className="mt-4 text-neutral-600">
                Sign in to manage your PREP'D store.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@prepd.com"
                    className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-black"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-black"
                  />
                </div>
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
                className="group flex w-full items-center justify-center rounded-full bg-black px-6 py-4 font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In

                    <ArrowRight
                      size={18}
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-neutral-500">
              This area is restricted to authorized PREP'D administrators.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}