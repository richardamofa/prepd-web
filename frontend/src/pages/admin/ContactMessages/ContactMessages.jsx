import { useState } from "react";

import StatusBadge from "@/components/admin/StatusBadge";
import Section from "@/components/ui/Section";
import { useToast } from "@/context/ToastContext";
import { useAdminMessageMutations, useAdminMessages } from "@/hooks/adminQueries";

const statuses = ["UNREAD", "READ", "REPLIED", "ARCHIVED"];

export default function ContactMessages() {
  const { showToast } = useToast();
  const [status, setStatus] = useState("");
  const { data: response, error, isPending, isFetching } = useAdminMessages(status);
  const { update } = useAdminMessageMutations();
  const messages = response?.data || [];

  const updateStatus = async (id, nextStatus) => {
    try { await update.mutateAsync({ id, data: { status: nextStatus } }); showToast("Contact message status updated.", "success"); }
    catch (mutationError) { showToast(mutationError.message || "Unable to update message.", "error"); }
  };

  return <Section className="py-8 lg:py-10">
    <div className="mb-10"><p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Admin</p><h1 className="mt-3 text-5xl font-black tracking-tight">Contact Messages</h1><p className="mt-4 text-neutral-600">Review customer questions and follow-ups.</p></div>
    <select value={status} onChange={(event) => setStatus(event.target.value)} className="mb-8 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm"><option value="">All statuses</option>{statuses.map((item) => <option key={item} value={item}>{item}</option>)}</select>
    {error && <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error.message}</div>}
    {isFetching && !isPending && <p className="mb-4 text-xs text-neutral-500">Updating messages...</p>}
    <div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-white"><table className="w-full min-w-180 text-left"><thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500"><tr><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Subject</th><th className="px-6 py-4">Message</th><th className="px-6 py-4">Status</th></tr></thead><tbody className="divide-y divide-neutral-100">{!isPending && messages.map((message) => <tr key={message.id}><td className="px-6 py-5"><p className="font-semibold">{message.name}</p><p className="text-sm text-neutral-500">{message.email}</p><p className="text-sm text-neutral-500">{message.phone}</p></td><td className="px-6 py-5 font-semibold">{message.subject || "General enquiry"}</td><td className="max-w-md px-6 py-5 text-sm text-neutral-600">{message.message}</td><td className="px-6 py-5"><StatusBadge status={message.status} /><select value={message.status} onChange={(event) => updateStatus(message.id, event.target.value)} className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-xs">{statuses.map((item) => <option key={item} value={item}>{item}</option>)}</select></td></tr>)}</tbody></table>{isPending && <p className="px-6 py-20 text-center text-neutral-500">Loading messages</p>}{!isPending && messages.length === 0 && <p className="px-6 py-20 text-center text-neutral-500">No contact messages found.</p>}</div>
  </Section>;
}
