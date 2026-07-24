import ProductStoryDisplay from "@/components/common/ProductStoryDisplay";
import StoryItem from "@/components/common/StoryItem";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { boxItems } from "@/constants/boxItems";
import { useEffect, useState } from "react";

export default function WhatsInside() {
  const [activeItem, setActiveItem] = useState("01");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".story-item");
      let current = "01";
      let closest = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

        if (distance < closest) {
          closest = distance;
          
          let rawId = section.id.replace("story-", "");
          
          if (rawId.length === 1) {
            rawId = "0" + rawId;
          }
          
          current = rawId;
        }
      });

      setActiveItem((prev) => (prev !== current ? current : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Section className="bg-neutral-50">
      <SectionHeading
        eyebrow="Inside PREP'D"
        title="Everything you need. Nothing you don't."
        description="Each item has been carefully selected to make your semester easier."
      />

      <div className="mt-24 grid gap-24 lg:grid-cols-[1fr_500px]">
        {/* Sticky Visual Display Side */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <ProductStoryDisplay activeItem={activeItem} />
          </div>
        </div>

        {/* Scrolling Copy Items */}
        <div>
          {boxItems.map((item) => (
            <StoryItem
              key={item.number}
              item={item}
              active={activeItem === item.number}
              onEnter={setActiveItem}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}