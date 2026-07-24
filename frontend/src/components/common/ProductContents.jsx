export default function ProductContents({
  items,
}) {
  return (
    <section className="mt-24 border-t border-neutral-200 pt-20">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          What's Inside
        </p>

        <h2 className="mt-4 text-4xl font-black">
          Everything in your box.
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.name}
            className="rounded-3xl bg-neutral-50 p-6"
          >
            <div className="flex h-48 items-center justify-center rounded-2xl bg-white p-6">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain"
              />
            </div>

            <p className="mt-6 text-sm font-semibold text-neutral-400">
              {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="mt-2 text-xl font-bold">
              {item.name}
            </h3>

            <p className="mt-3 text-sm leading-7 text-neutral-600">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}