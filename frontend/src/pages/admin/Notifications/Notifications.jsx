import { Bell, ClipboardList, Mail, ShieldCheck, Trash2 } from "lucide-react";

import Section from "@/components/ui/Section";
import { useAdminNotifications } from "@/hooks/adminQueries";

const activityIcons = {
  ORDER_CREATED: ClipboardList,
  CUSTOMIZATION_REQUEST_CREATED: ClipboardList,
  CONTACT_MESSAGE_CREATED: Mail,
  ADMIN_LOGIN: ShieldCheck,
  ORDER_DELETED: Trash2,
  CUSTOMIZATION_REQUEST_DELETED: Trash2,
  CONTACT_MESSAGE_DELETED: Trash2,
};

const activityStyles = {
  ORDER_CREATED: "bg-emerald-50 text-emerald-700",
  CUSTOMIZATION_REQUEST_CREATED: "bg-amber-50 text-amber-700",
  CONTACT_MESSAGE_CREATED: "bg-sky-50 text-sky-700",
  ADMIN_LOGIN: "bg-neutral-100 text-neutral-700",
  ORDER_DELETED: "bg-red-50 text-red-700",
  CUSTOMIZATION_REQUEST_DELETED: "bg-red-50 text-red-700",
  CONTACT_MESSAGE_DELETED: "bg-red-50 text-red-700",
};

export default function Notifications() {
  const { data: response, error, isPending } = useAdminNotifications();
  const activities = response?.data || [];

  return <Section className="py-8 lg:py-10">
    <div className="mb-10 flex items-start justify-between gap-5">
      <div><p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Admin</p><h1 className="mt-3 text-5xl font-black tracking-tight">Notifications</h1><p className="mt-4 text-neutral-600">A record of store activity and admin sessions.</p></div>
      <div className="hidden rounded-2xl border border-neutral-200 bg-white p-4 sm:block"><Bell size={20} className="text-neutral-500" /><p className="mt-2 text-2xl font-black">{activities.length}</p><p className="text-xs uppercase tracking-wider text-neutral-500">Recent events</p></div>
    </div>
    {error && <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error.message}</div>}
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
      {isPending && <p className="px-6 py-20 text-center text-neutral-500">Loading notifications...</p>}
      {!isPending && activities.length === 0 && <p className="px-6 py-20 text-center text-neutral-500">No activity has been recorded yet.</p>}
      <div className="divide-y divide-neutral-100">{activities.map((activity) => { const Icon = activityIcons[activity.type] || Bell; return <article key={activity.id} className="flex gap-4 px-5 py-5 sm:px-6"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activityStyles[activity.type] || "bg-neutral-100 text-neutral-700"}`}><Icon size={18} /></div><div className="min-w-0 flex-1"><div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"><h2 className="font-bold text-neutral-900">{activity.title}</h2><time className="text-xs text-neutral-500" dateTime={activity.createdAt}>{new Date(activity.createdAt).toLocaleString()}</time></div><p className="mt-1 text-sm leading-6 text-neutral-600">{activity.description}</p>{activity.admin && <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">By {activity.admin.name || activity.admin.email}</p>}</div></article>; })}</div>
    </div>
  </Section>;
}