export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  return (
    <div
      className={`max-w-2xl ${
        align === "center"
          ? "mx-auto text-center"
          : "text-left"
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-neutral-600">
          {description}
        </p>
      )}
    </div>
  );
}