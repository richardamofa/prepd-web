import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Section from "@/components/ui/Section";

export default function ShopCTA() {
  return (
    <Section>
      <div className="rounded-4xl bg-neutral-100 px-8 py-20 text-center md:px-16">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Need something different?
        </p>

        <h2 className="mt-5 text-4xl font-black md:text-5xl">
          Make your PREP'D box yours.
        </h2>

        <p className="mx-auto mt-6 max-w-xl leading-7 text-neutral-600">
          Need a customized box, bulk order, or something specific for your
          school or programme?
        </p>

        <Link
          to="/#contact"
          className="mt-8 inline-flex items-center rounded-full bg-white px-7 py-4 font-semibold text-black transition hover:scale-[1.02]"
        >
          Get in touch
          <ArrowRight
            size={18}
            className="ml-2 text-black"
          />
        </Link>
      </div>
    </Section>
  );
}