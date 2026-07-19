import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "@/components/common/Loader";

import Home from "@/pages/Home/Home";
import Shop from "@/pages/Shop/Shop";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/shop" element={<Shop />} />
    </Routes>
  );
}