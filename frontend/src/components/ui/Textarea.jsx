export default function Textarea({
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

      <textarea
        rows={5}
        className="
          rounded-xl
          border
          border-neutral-300
          px-4
          py-3
          outline-none
          resize-none
          transition
          focus:border-black
        "
        {...props}
      />
    </label>
  );
}