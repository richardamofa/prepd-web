import Section from "@/components/ui/Section";

export default function AboutHero() {
  return (
    <Section className="pt-40 pb-24">
      <div className="max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          About PREP'D
        </p>

        <h1 className="mt-6 max-w-5xl text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
          Start prepared.
          <br />
          Stay ready.
        </h1>

        <p className="mt-10 max-w-2xl text-lg leading-8 text-neutral-600 md:text-xl">
          PREP'D creates thoughtfully curated student essentials designed to
          make starting a new semester simpler, easier, and more exciting.
        </p>
      </div>
    </Section>
  );
}