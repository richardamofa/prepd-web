import { ArrowRight } from "lucide-react";

import ProductDisplay from "@/components/common/ProductDisplay";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

export default function FeaturedProduct() {
  return (
    <Section>
      <div className="mx-auto max-w-6xl rounded-[36px] border border-neutral-200 bg-neutral-50 p-8 md:p-16">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Product */}
          <div className="flex justify-center">
            <ProductDisplay />
          </div>

          {/* Content */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
              Featured Box
            </p>

            <h2 className="text-4xl font-black leading-tight lg:text-5xl">
              Everything You Need.
              <br />
              Nothing You Don't.
            </h2>

            <p className="mt-6 leading-8 text-neutral-600">
              The PREP'D Student Starter Box is thoughtfully curated with
              everyday essentials that help students stay organized,
              productive, and prepared from the very first day of the semester.
            </p>

            <div className="mt-10 flex gap-4">
              <Button>
                Shop Now
              </Button>

              <Button variant="secondary">
                Learn More
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}