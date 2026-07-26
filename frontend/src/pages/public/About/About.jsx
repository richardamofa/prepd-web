import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AboutCTA from "@/components/sections/about/AboutCTA";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutValues from "@/components/sections/about/AboutValues";

export default function About() {
  return (
    <main>
    <Navbar />
      <AboutHero />

      <AboutStory />

      <AboutValues />

      <AboutCTA />
    <Footer />
    </main>
  );
}