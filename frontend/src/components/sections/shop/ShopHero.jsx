import { ArrowDown } from "lucide-react";

import Section from "@/components/ui/Section";

import heroImage from "@/assets/images/hero.jpg";

export default function ShopHero() {
  return (
    <Section className="pt-32 md:pt-36">
      <div className="relative min-h-162.5 overflow-hidden rounded-4xl md:min-h-180 md:rounded-[3rem]">
        {/* Background Image */}
        <img
          src={heroImage}
          alt="PREP'D student essentials"
          className="absolute inset-0 h-150 w-200 object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 flex min-h-162.5 items-center px-6 py-20 md:min-h-180 md:px-16 lg:px-24">
          <div className="max-w-3xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70 md:text-sm">
              The PREP'D Shop
            </p>

            <h1 className="mt-5 max-w-2xl text-6xl font-black leading-[0.95] tracking-tight md:text-8xl lg:text-9xl">
              Start
              <br />
              prepared.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
              Thoughtfully curated essentials designed to help students start
              every semester with confidence.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 left-10 z-10 flex items-center gap-5 text-xs uppercase tracking-[0.25em] text-white/70 md:left-16">
          <ArrowDown
            size={16}
            className="animate-bounce"
          />

          <span>Explore</span>
        </div>
      </div>
    </Section>
  );
}