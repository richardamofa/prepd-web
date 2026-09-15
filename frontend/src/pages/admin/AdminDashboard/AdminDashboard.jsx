import { BadgeDollarSign, Clock3, Package, TrendingUp } from "lucide-react";

import { useNavigate } from "react-router-dom";

import StatusBadge from "@/components/admin/StatusBadge";
import Section from "@/components/ui/Section";
import { useAdminDashboard } from "@/hooks/adminQueries";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data: response, error, isPending, isFetching } = useAdminDashboard();
  const dashboard = response?.data;
  const metrics = dashboard?.metrics;
  const recentOrders = dashboard?.recentOrders || [];

  if (isPending && !response) {
    return <Section className="py-8 lg:py-10"><div className="space-y-6"><div className="h-10 w-56 animate-pulse rounded-xl bg-neutral-200" /><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-32 animate-pulse rounded-3xl bg-neutral-200" />)}</div><div className="h-72 animate-pulse rounded-3xl bg-neutral-200" /></div></Section>;
  }
  return (
    <Section className="py-8 lg:py-10">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
          Overview
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Dashboard
        </h1>

        <p className="mt-3 text-neutral-600">
          Here's what's happening with PREP'D.
        </p>
      </div>

      {isFetching && <p className="mb-4 text-xs font-medium text-neutral-500">Updating dashboard...</p>}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Orders" value={metrics?.totalOrders ?? "-"} icon={Package} />
        <StatCard label="Pending Payments" value={metrics?.pendingPayments ?? "-"} icon={BadgeDollarSign} />
        <StatCard label="Pending Orders" value={metrics?.pendingOrders ?? "-"} icon={Clock3} />
        <StatCard label="Completed Orders" value={metrics?.completedOrders ?? "-"} icon={TrendingUp} />
      </div>

      {error && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error.message}</div>}

      <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black">Recent Orders</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Your latest customer orders.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/orders")}
            className="text-sm font-semibold underline underline-offset-4"
          >
            View All
          </button>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-140 text-left">
            <thead>
              <tr className="border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500">
                <th className="pb-4">Order</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Total</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((row) => (
                <tr key={row.id} className="border-b border-neutral-100 last:border-0">
                  <td className="py-5 font-semibold">{row.reference}</td>
                  <td className="py-5 text-neutral-600">{row.customerName}</td>
                  <td className="py-5 font-semibold">GH₵ {Number(row.total).toFixed(2)}</td>
                  <td className="py-5">
                    <StatusBadge status={row.orderStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Section>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">{label}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
          <Icon size={18} />
        </div>
      </div>

      <p className="mt-4 text-3xl font-black tracking-tight">{value}</p>
    </div>
  );
}