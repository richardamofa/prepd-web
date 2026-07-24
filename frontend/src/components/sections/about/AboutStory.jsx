import Section from "@/components/ui/Section";

export default function AboutStory() {
  return (
    <Section className="bg-neutral-50">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            The Idea
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            Starting a semester should feel exciting.
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-8 text-neutral-600">
          <p>
            Starting a new semester often comes with a long list of things to
            get. Notebooks. Pens. Planners. Highlighters. Flash cards. And
            somehow, something always gets forgotten.
          </p>

          <p>
            PREP'D was created to make that process simpler. Instead of
            searching for every essential individually, students can get the
            things they need in one carefully curated box.
          </p>

          <p>
            Less stress. Less searching. More time to focus on what actually
            matters.
          </p>
        </div>
      </div>
    </Section>
  );
}