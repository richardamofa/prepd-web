import { X } from "lucide-react";

export default function AdminModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "lg",
}) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size] || "max-w-2xl";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-3 py-4 backdrop-blur-sm sm:px-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${sizeClasses} max-h-[90vh] overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-2xl`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-100 hover:text-black"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="max-h-[calc(90vh-2rem)] overflow-y-auto p-5 sm:p-7">
          {(title || description) && (
            <div className="mb-6 pr-10">
              {title && (
                <h2 className="text-xl font-black tracking-tight">
                  {title}
                </h2>
              )}

              {description && (
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {description}
                </p>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
