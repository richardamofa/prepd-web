import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CustomizationBuilder from "@/components/sections/shop/CustomizationBuilder";
import ProductCollection from "@/components/sections/shop/ProductCollection";
import ShopCTA from "@/components/sections/shop/ShopCTA";
import ShopHero from "@/components/sections/shop/ShopHero";

import ProductMarquee from "@/components/common/ProductMarquee";

export default function Shop() {
  return (
    <>
    <Navbar />
      <ShopHero />

      <ProductCollection />

      <ProductMarquee />

      <CustomizationBuilder />

      <ShopCTA />
    <Footer />
    </>
  );
}