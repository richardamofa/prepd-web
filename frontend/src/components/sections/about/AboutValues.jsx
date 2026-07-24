import Section from "@/components/ui/Section";

const values = [
  {
    number: "01",
    title: "Simple",
    description:
      "The essentials should be easy to find, easy to order, and ready when you need them.",
  },
  {
    number: "02",
    title: "Thoughtful",
    description:
      "Every item in a PREP'D box is selected with real student needs in mind.",
  },
  {
    number: "03",
    title: "Ready",
    description:
      "Our goal is simple: help students start each semester feeling prepared.",
  },
];

export default function AboutValues() {
  return (
    <Section>
      <div className="mb-16">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          What We Believe
        </p>

        <h2 className="mt-5 max-w-2xl text-4xl font-black md:text-6xl">
          Prepared looks different for everyone.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <article
            key={value.number}
            className="rounded-3xl bg-neutral-50 p-8 transition duration-300 hover:-translate-y-1"
          >
            <p className="text-sm font-semibold tracking-[0.3em] text-neutral-400">
              {value.number}
            </p>

            <h3 className="mt-8 text-3xl font-black">
              {value.title}
            </h3>

            <p className="mt-5 leading-7 text-neutral-600">
              {value.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}