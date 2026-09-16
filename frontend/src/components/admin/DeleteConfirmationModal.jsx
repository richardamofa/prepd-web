import { AlertTriangle, Trash2 } from "lucide-react";

import AdminModal from "@/components/admin/AdminModal";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemLabel,
  isDeleting = false,
}) {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={isDeleting ? undefined : onClose}
      title={title}
      description="This action permanently removes the record and cannot be undone."
      size="sm"
    >
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={20} />
          <p className="text-sm leading-6">
            You are about to delete <strong>{itemLabel}</strong>. Check that this is the correct record before continuing.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={16} />
          {isDeleting ? "Deleting..." : "Delete permanently"}
        </button>
      </div>
    </AdminModal>
  );
}
