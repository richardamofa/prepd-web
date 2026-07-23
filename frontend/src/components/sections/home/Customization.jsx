import { Sparkles } from "lucide-react";

import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

import ProductDisplay from "@/components/common/ProductDisplay";

export default function Customization() {
  return (
    <Section>
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Content */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
            <Sparkles size={16} />
            Custom Orders
          </div>

          <h2 className="mt-6 text-4xl font-black leading-tight lg:text-5xl">
            Need Something
            <br />
            Made Just for You?
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-neutral-600">
            Whether you're ordering for yourself, a class, a student
            organization, or as a thoughtful gift, we'll work with you to
            create a PREP'D box that fits your needs.
          </p>

          <div className="mt-8 space-y-4 text-neutral-700">
            <p>✓ School-specific requests</p>
            <p>✓ Programme-based essentials</p>
            <p>✓ Gift boxes</p>
            <p>✓ Bulk student orders</p>
          </div>

          <Button className="mt-10">
            Request Customization
          </Button>
        </div>

        {/* Product */}
        <div className="flex justify-center">
          <ProductDisplay />
        </div>
      </div>
    </Section>
  );
}