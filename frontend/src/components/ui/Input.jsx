export default function Input({
  label,
  ...props
}) {
  return (
    <label className="flex flex-col gap-2">
      {label && (
        <span className="text-sm font-medium">
          {label}
        </span>
      )}

      <input
        className="
          rounded-xl
          border
          border-neutral-300
          px-4
          py-3
          outline-none
          transition
          focus:border-black
        "
        {...props}
      />
    </label>
  );
}