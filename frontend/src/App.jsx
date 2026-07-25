import Loader from "@/components/common/Loader";
import ScrollToHash from "@/components/common/ScrollToHash";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import About from "@/pages/About/About";
import Cart from "@/pages/Cart/Cart";
import Checkout from "@/pages/Checkout/Checkout";
import Home from "@/pages/Home/Home";
import ProductDetails from "@/pages/Shop/ProductDetails";
import Shop from "@/pages/Shop/Shop";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("prepd-loaded");

    if (hasLoadedBefore) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("prepd-loaded", "true");
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
        <Route path="/" element={<Home />} />

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
      </Routes>
    </>
  );
}