import { motion } from "framer-motion";

import Section from "@/components/ui/Section";

const features = [
  {
    number: "01",
    title: "Built for Productivity",
    description:
      "Every item inside the PREP'D box has been chosen to help you stay focused, organized, and ready for every class.",
  },
  {
    number: "02",
    title: "Organized From Day One",
    description:
      "No more last-minute shopping. Open your box and begin the semester with everything you need.",
  },
  {
    number: "03",
    title: "Premium Essentials",
    description:
      "Quality matters. That's why every product is selected for durability, comfort, and everyday use.",
  },
  {
    number: "04",
    title: "Made With Students In Mind",
    description:
      "Designed around real student needs—not unnecessary extras.",
  },
];

export default function WhyPrepd() {
  return (
    <Section className="bg-black text-white">
      <div className="grid gap-24 lg:grid-cols-[450px_1fr]">
        {/* Left */}
        <div className="lg:sticky lg:top-32 h-fit">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
            Why PREP'D
          </p>

          <h2 className="mt-6 text-5xl font-black leading-tight lg:text-7xl">
            Designed
            <br />
            for Every
            <br />
            Student.
          </h2>

          <p className="mt-8 text-neutral-400 leading-8">
            Thoughtfully curated to help students begin every semester
            with confidence, organization and peace of mind.
          </p>
        </div>

        {/* Right */}
        <div>
          {features.map((feature) => (
            <motion.div
              key={feature.number}
              whileHover={{ x: 12 }}
              className="border-b border-white/10 py-12"
            >
              <span className="text-sm tracking-[0.3em] text-neutral-500">
                {feature.number}
              </span>

              <h3 className="mt-4 text-3xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-5 max-w-xl leading-8 text-neutral-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}