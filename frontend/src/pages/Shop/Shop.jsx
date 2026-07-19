import ProductCollection from "@/components/sections/ProductCollection";
import ShopCTA from "@/components/sections/ShopCTA";
import ShopHero from "@/components/sections/ShopHero";

import CustomizationBuilder from "@/components/sections/CustomizationBuilder";

import ProductMarquee from "@/components/common/ProductMarquee";

export default function Shop() {
  return (
    <>
      <ShopHero />

      <ProductCollection />

      <ProductMarquee />

      <CustomizationBuilder />

      <ShopCTA />
    </>
  );
}