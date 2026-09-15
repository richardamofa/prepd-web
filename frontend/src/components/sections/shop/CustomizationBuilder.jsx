import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import CustomizationForm from "@/components/common/CustomizationForm";
import CustomizationProductDisplay from "@/components/common/CustomizationProductDisplay";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { customizationItems as fallbackCustomizationItems } from "@/constants/customizationOptions";
import api from "@/services/api";

export default function CustomizationBuilder() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { data: response, isPending, isError } = useQuery({
    queryKey: ["customizations"],
    queryFn: api.customizations.getAll,
  });
  const customizationItems = isPending || isError
    ? fallbackCustomizationItems
    : response?.data || [];

  return (
    <Section className="bg-neutral-50">
      <SectionHeading
        eyebrow="Make It Yours"
        title="Build your PREP'D box."
        description="Choose the essentials that fit your needs and tell us how you'd like your box prepared."
        id= "customization"
      />

      <div className="mt-20 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
        {/* Product Display */}

        <div className="lg:sticky lg:top-28">
          <CustomizationProductDisplay
            selectedItems={selectedItems}
            customizationItems={customizationItems}
          />
        </div>

        {/* Form */}

        <div className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <CustomizationForm
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            customizationItems={customizationItems}
          />
        </div>
      </div>
    </Section>
  );
}