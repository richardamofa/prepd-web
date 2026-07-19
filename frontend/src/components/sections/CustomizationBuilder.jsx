import { useState } from "react";

import CustomizationForm from "@/components/common/CustomizationForm";
import CustomizationProductDisplay from "@/components/common/CustomizationProductDisplay";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CustomizationBuilder() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Section className="bg-neutral-50">
      <SectionHeading
        eyebrow="Make It Yours"
        title="Build your PREP'D box."
        description="Choose the essentials that fit your needs and tell us how you'd like your box prepared."
      />

      <div className="mt-20 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
        {/* Product Display */}

        <div className="lg:sticky lg:top-28">
          <CustomizationProductDisplay
            selectedItems={selectedItems}
          />
        </div>

        {/* Form */}

        <div className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <CustomizationForm
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
      </div>
    </Section>
  );
}