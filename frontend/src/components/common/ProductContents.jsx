export default function ProductContents({
  items = [],
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
        {items.map((item, index) => {
          const customization = item.customizationItem;

          if (!customization) return null;

          return (
            <article
              key={customization.id}
              className="rounded-3xl bg-neutral-50 p-6"
            >
              <div className="flex h-48 items-center justify-center rounded-2xl bg-white p-6">
                <img
                  src={
                    customization.image ||
                    "/images/placeholders/customization-placeholder.png"
                  }
                  alt={customization.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/images/placeholders/customization-placeholder.png";
                  }}
                />
              </div>

              <p className="mt-6 text-sm font-semibold text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {customization.name}
              </h3>

              <p className="mt-3 text-sm leading-7 text-neutral-600">
                {customization.description ||
                  "A useful essential included in your PREP'D box."}
              </p>

              <p className="mt-4 text-sm font-semibold text-neutral-500">
                Quantity: {item.quantity}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}