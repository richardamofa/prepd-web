import {
    Archive,
    CheckCircle2,
    Clock3,
    FileCheck2,
    FileSearch,
    Hammer,
    HelpCircle,
    Package,
    RotateCcw,
    Send,
    XCircle
} from "lucide-react";

const statusConfig = {
  PENDING: { label: "Pending", icon: Clock3, className: "border-amber-200 bg-amber-50 text-amber-800" },
  PROCESSING: { label: "Processing", icon: Package, className: "border-sky-200 bg-sky-50 text-sky-800" },
  COMPLETED: { label: "Completed", icon: CheckCircle2, className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  CANCELLED: { label: "Cancelled", icon: XCircle, className: "border-rose-200 bg-rose-50 text-rose-800" },
  PAID: { label: "Paid", icon: CheckCircle2, className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  FAILED: { label: "Failed", icon: XCircle, className: "border-rose-200 bg-rose-50 text-rose-800" },
  REFUNDED: { label: "Refunded", icon: RotateCcw, className: "border-violet-200 bg-violet-50 text-violet-800" },
  REVIEWING: { label: "Reviewing", icon: FileSearch, className: "border-sky-200 bg-sky-50 text-sky-800" },
  QUOTED: { label: "Quoted", icon: Send, className: "border-indigo-200 bg-indigo-50 text-indigo-800" },
  APPROVED: { label: "Approved", icon: FileCheck2, className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  IN_PROGRESS: { label: "In progress", icon: Hammer, className: "border-orange-200 bg-orange-50 text-orange-800" },
  REJECTED: { label: "Rejected", icon: XCircle, className: "border-rose-200 bg-rose-50 text-rose-800" },
  UNREAD: { label: "Unread", icon: HelpCircle, className: "border-amber-200 bg-amber-50 text-amber-800" },
  READ: { label: "Read", icon: FileSearch, className: "border-sky-200 bg-sky-50 text-sky-800" },
  REPLIED: { label: "Replied", icon: Send, className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  ARCHIVED: { label: "Archived", icon: Archive, className: "border-neutral-200 bg-neutral-100 text-neutral-700" },
  ACTIVE: { label: "Active", icon: CheckCircle2, className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  INACTIVE: { label: "Inactive", icon: XCircle, className: "border-neutral-200 bg-neutral-100 text-neutral-700" },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[String(status || "").toUpperCase()] || {
    label: status || "Unknown",
    icon: HelpCircle,
    className: "border-neutral-200 bg-neutral-100 text-neutral-700",
  };
  const Icon = config.icon;

  return <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${config.className}`}>
    <Icon size={14} aria-hidden="true" />
    {config.label}
  </span>;
}
