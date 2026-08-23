import { Eye } from "lucide-react";
import { useState } from "react";

import AdminModal from "@/components/admin/AdminModal";
import StatusBadge from "@/components/admin/StatusBadge";
import Section from "@/components/ui/Section";
import { useToast } from "@/context/ToastContext";
import { useAdminCustomizationRequests, useAdminRequestMutations } from "@/hooks/adminQueries";

const statuses = ["PENDING", "REVIEWING", "QUOTED", "APPROVED", "IN_PROGRESS", "COMPLETED", "REJECTED", "CANCELLED"];

export default function CustomizationRequests() {
  const { showToast } = useToast();
  const [status, setStatus] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { data: response, error, isPending, isFetching } = useAdminCustomizationRequests(status);
  const { update } = useAdminRequestMutations();
  const requests = response?.data || [];

  const updateStatus = async (id, nextStatus) => {
    try { await update.mutateAsync({ id, data: { status: nextStatus } }); showToast("Customization request status updated.", "success"); }
    catch (mutationError) { showToast(mutationError.message || "Unable to update request.", "error"); }
  };

  return <Section className="py-8 lg:py-10">
    <div className="mb-10"><p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Admin</p><h1 className="mt-3 text-5xl font-black tracking-tight">Customization Requests</h1><p className="mt-4 text-neutral-600">Review and manage customer requests.</p></div>
    <select value={status} onChange={(event) => setStatus(event.target.value)} className="mb-8 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm"><option value="">All statuses</option>{statuses.map((item) => <option key={item} value={item}>{item.replace("_", " ")}</option>)}</select>
    {error && <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error.message}</div>}
    {isFetching && !isPending && <p className="mb-4 text-xs text-neutral-500">Updating requests...</p>}
    <div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-white"><table className="w-full min-w-180 text-left"><thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500"><tr><th className="px-6 py-4">Reference</th><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Product</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Details</th></tr></thead><tbody className="divide-y divide-neutral-100">{!isPending && requests.map((request) => <tr key={request.id}><td className="px-6 py-5 font-semibold">{request.reference}</td><td className="px-6 py-5"><p className="font-semibold">{request.customerName}</p><p className="text-sm text-neutral-500">{request.customerEmail}</p><p className="text-sm text-neutral-500">{request.customerPhone}</p></td><td className="px-6 py-5 text-sm">{request.product?.name || "Custom box"}</td><td className="px-6 py-5"><StatusBadge status={request.status} /><select value={request.status} onChange={(event) => updateStatus(request.id, event.target.value)} className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-xs">{statuses.map((item) => <option key={item} value={item}>{item.replace("_", " ")}</option>)}</select></td><td className="px-6 py-5"><button type="button" onClick={() => setSelectedRequest(request)} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-xs font-semibold"><Eye size={14} /> View</button></td></tr>)}</tbody></table>{isPending && <p className="px-6 py-20 text-center text-neutral-500">Loading requests</p>}{!isPending && requests.length === 0 && <p className="px-6 py-20 text-center text-neutral-500">No customization requests found.</p>}</div>
    <AdminModal isOpen={Boolean(selectedRequest)} onClose={() => setSelectedRequest(null)} title={selectedRequest?.reference || "Customization request"} description="Full customer request details and internal notes." size="lg">{selectedRequest && <div className="space-y-5"><div className="flex items-center justify-between"><div><p className="font-semibold">{selectedRequest.customerName}</p><p className="text-sm text-neutral-500">{selectedRequest.customerEmail} · {selectedRequest.customerPhone}</p></div><StatusBadge status={selectedRequest.status} /></div><div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Requested customization</p><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-neutral-700">{selectedRequest.request}</p></div><div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Budget</p><p className="mt-2 text-sm text-neutral-700">{selectedRequest.budget ? `GH₵ ${Number(selectedRequest.budget).toFixed(2)}` : "Not provided"}</p></div><div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Admin notes</p><p className="mt-2 whitespace-pre-wrap text-sm text-neutral-700">{selectedRequest.adminNotes || "No notes yet."}</p></div></div>}</AdminModal>
  </Section>;
}
