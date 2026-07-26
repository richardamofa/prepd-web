import { BadgeDollarSign, Clock3, Package, TrendingUp } from "lucide-react";

import Section from "@/components/ui/Section";

const recentOrders = [
  { order: "#PREPD-1001", customer: "John Doe", total: "GH₵ 500", status: "PAID" },
  { order: "#PREPD-1002", customer: "Jane Doe", total: "GH₵ 750", status: "PROCESSING" },
  { order: "#PREPD-1003", customer: "Alex Smith", total: "GH₵ 350", status: "PENDING" },
];

const statusStyles = {
  PAID: "bg-green-100 text-green-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  PENDING: "bg-amber-100 text-amber-700",
};

export default function AdminDashboard() {
  return (
    <Section className="pt-32">
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

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Orders" value="124" icon={Package} />
        <StatCard label="Paid Orders" value="98" icon={BadgeDollarSign} />
        <StatCard label="Pending Orders" value="12" icon={Clock3} />
        <StatCard label="Revenue" value="GH₵ 45,000" icon={TrendingUp} />
      </div>

      <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black">Recent Orders</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Your latest customer orders.
            </p>
          </div>

          <button className="text-sm font-semibold underline underline-offset-4">
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
                <tr key={row.order} className="border-b border-neutral-100 last:border-0">
                  <td className="py-5 font-semibold">{row.order}</td>
                  <td className="py-5 text-neutral-600">{row.customer}</td>
                  <td className="py-5 font-semibold">{row.total}</td>
                  <td className="py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[row.status] || "bg-neutral-100 text-neutral-700"}`}
                    >
                      {row.status}
                    </span>
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