import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Section from "@/components/ui/Section";

export default function AboutCTA() {
  return (
    <Section>
      <div className="rounded-4xl bg-black px-8 py-16 text-center text-white md:px-16 md:py-24">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
          Ready when you are
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black md:text-6xl">
          Start your next semester PREP'D.
        </h2>

        <p className="mx-auto mt-6 max-w-xl leading-8 text-neutral-400">
          Get the essentials you need to start organized, confident, and ready
          for what's ahead.
        </p>

        <Link
          to="/shop"
          className="group mt-10 inline-flex items-center rounded-full bg-white px-7 py-4 font-semibold text-black transition hover:bg-neutral-300"
        >
          Shop PREP'D

          <ArrowRight
            size={18}
            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Section>
  );
}