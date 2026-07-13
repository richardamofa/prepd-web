import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/sections/Contact";
import Customization from "@/components/sections/Customization";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import Hero from "@/components/sections/Hero";
import WhatsInside from "@/components/sections/WhatsInside";
import WhyPrepd from "@/components/sections/WhyPrepd";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <WhatsInside />

      <WhyPrepd />

      <FeaturedProduct />

      <Customization />

      <Contact />

      <Footer />
    </>
  );
}