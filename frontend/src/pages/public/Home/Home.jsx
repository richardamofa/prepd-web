import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/sections/home/Contact";
import Customization from "@/components/sections/home/Customization";
import FeaturedProduct from "@/components/sections/home/FeaturedProduct";
import Hero from "@/components/sections/home/Hero";
import WhatsInside from "@/components/sections/home/WhatsInside";
import WhyPrepd from "@/components/sections/home/WhyPrepd";

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