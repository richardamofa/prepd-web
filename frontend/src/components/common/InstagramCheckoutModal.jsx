import { Check, Copy } from "lucide-react";

function InstagramIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CloseIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export default function InstagramCheckoutModal({
  isOpen,
  orderReference,
  orderMessage,
  onClose,
  onOpenInstagram,
}) {
  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage);
    } catch (clipboardError) {
      void clipboardError;
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition hover:bg-neutral-200"
          aria-label="Close modal"
        >
          <CloseIcon size={20} />
        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <Check size={28} />
        </div>

        <h2 className="mt-6 text-2xl font-black">
          Your order is ready!
        </h2>

        <p className="mt-3 leading-7 text-neutral-600">
          Your order has been saved. We've also prepared your order details
          for Instagram.
        </p>

        <div className="mt-6 rounded-2xl bg-neutral-50 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Order Reference
          </p>

          <p className="mt-2 text-xl font-black">
            {orderReference}
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold">
              Order details
            </p>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-black"
            >
              <Copy size={16} />
              Copy
            </button>
          </div>

          <pre className="mt-4 max-h-48 overflow-y-auto whitespace-pre-wrap text-xs leading-6 text-neutral-600">
            {orderMessage}
          </pre>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={onOpenInstagram}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-4 font-semibold text-white transition hover:bg-neutral-800"
          >
            <InstagramIcon size={20} />

            Open Instagram
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-full border border-neutral-200 px-6 py-4 font-semibold transition hover:bg-neutral-50"
          >
            Continue Shopping
          </button>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-neutral-500">
          Copy the order details below, paste them into the PREP'D
          Instagram chat and send the message.
        </p>
      </div>
    </div>
  );
}