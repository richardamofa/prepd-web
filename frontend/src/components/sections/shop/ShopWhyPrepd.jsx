import Section from "@/components/ui/Section";

const benefits = [
  {
    number: "01",
    title: "Curated essentials",
    description:
      "Everything is selected with students and everyday campus life in mind.",
  },
  {
    number: "02",
    title: "Ready from day one",
    description:
      "No need to spend hours searching for all the basics separately.",
  },
  {
    number: "03",
    title: "Thoughtfully packaged",
    description:
      "A practical collection designed to feel useful, intentional, and exciting.",
  },
];

export default function ShopWhyPrepd() {
  return (
    <Section className="bg-black text-white">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Why PREP'D
          </p>

          <h2 className="mt-5 text-5xl font-black leading-tight md:text-6xl">
            More than
            <br />
            just a box.
          </h2>
        </div>

        <div>
          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="border-b border-white/10 py-8 first:pt-0"
            >
              <span className="text-sm text-white/40">
                {benefit.number}
              </span>

              <h3 className="mt-3 text-2xl font-bold">
                {benefit.title}
              </h3>

              <p className="mt-3 max-w-lg leading-7 text-white/60">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}