export default function QuantitySelector({
  quantity,
  setQuantity,
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold">
        Quantity
      </p>

      <div className="flex w-fit items-center rounded-xl border border-neutral-200">
        <button
          type="button"
          onClick={() =>
            setQuantity((previous) =>
              Math.max(1, previous - 1),
            )
          }
          className="px-5 py-3 text-xl transition hover:bg-neutral-100"
        >
          −
        </button>

        <span className="min-w-14 text-center font-semibold">
          {quantity}
        </span>

        <button
          type="button"
          onClick={() =>
            setQuantity((previous) =>
              previous + 1,
            )
          }
          className="px-5 py-3 text-xl transition hover:bg-neutral-100"
        >
          +
        </button>
      </div>
    </div>
  );
}