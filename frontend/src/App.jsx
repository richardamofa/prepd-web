import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Loader from "@/components/common/Loader";
import ScrollToHash from "@/components/common/ScrollToHash";
import AdminLayout from "@/components/layout/AdminLayout";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import About from "@/pages/public/About/About";
import Cart from "@/pages/public/Cart/Cart";
import Checkout from "@/pages/public/Checkout/Checkout";
import Home from "@/pages/public/Home/Home";
import ProductDetails from "@/pages/public/Shop/ProductDetails";
import Shop from "@/pages/public/Shop/Shop";

import AdminDashboard from "@/pages/admin/AdminDashboard/AdminDashboard";
import AdminLogin from "@/pages/admin/AdminLogin/AdminLogin";
import Customizations from "@/pages/admin/Customizations/Customizations";
import Orders from "@/pages/admin/Orders/Orders";
import Products from "@/pages/admin/Products/Products";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoadedBefore =
      sessionStorage.getItem("prepd-loaded");

    if (hasLoadedBefore) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);

      sessionStorage.setItem(
        "prepd-loaded",
        "true",
      );
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ScrollToHash />

      <Routes>
        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/shop/:slug"
          element={<ProductDetails />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* ADMIN LOGIN */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* PROTECTED ADMIN ROUTES */}

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/orders"
              element={<Orders />}
            />

            <Route
              path="/admin/products"
              element={<Products />}
            />

            <Route
              path="/admin/customizations"
              element={<Customizations />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}