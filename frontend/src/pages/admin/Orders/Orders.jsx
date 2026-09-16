import { Eye, Search, Trash2 } from "lucide-react";

import { useMemo, useState } from "react";

import AdminModal from "@/components/admin/AdminModal";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";
import StatusBadge from "@/components/admin/StatusBadge";
import Section from "@/components/ui/Section";
import { useToast } from "@/context/ToastContext";
import { useAdminOrderMutations, useAdminOrders } from "@/hooks/adminQueries";

/* const mockOrders = [
  {
    id: "ORD-1001",
    customer: {
      name: "Richard Amofa",
      email: "richard@example.com",
      phone: "+233 XX XXX XXXX",
    },
    items: [
      {
        name: "PREP'D Level Up Box",
        quantity: 1,
        price: 500,
      },
    ],
    total: 500,
    paymentMethod: "MTN MoMo",
    paymentStatus: "paid",
    orderStatus: "processing",
    delivery: true,
    address: "Accra, Ghana",
    createdAt: "2026-07-25",
  },

  {
    id: "ORD-1002",
    customer: {
      name: "Ama Mensah",
      email: "ama@example.com",
      phone: "+233 XX XXX XXXX",
    },
    items: [
      {
        name: "PREP'D Student Starter Box",
        quantity: 1,
        price: 350,
      },
    ],
    total: 350,
    paymentMethod: "MTN MoMo",
    paymentStatus: "pending",
    orderStatus: "pending",
    delivery: false,
    address: null,
    createdAt: "2026-07-24",
  },

  {
    id: "ORD-1003",
    customer: {
      name: "Kojo Asante",
      email: "kojo@example.com",
      phone: "+233 XX XXX XXXX",
    },
    items: [
      {
        name: "PREP'D Level Up+ Box",
        quantity: 1,
        price: 750,
      },
    ],
    total: 750,
    paymentMethod: "MTN MoMo",
    paymentStatus: "paid",
    orderStatus: "completed",
    delivery: true,
    address: "Kumasi, Ghana",
    createdAt: "2026-07-23",
  },
]; */

export default function Orders() {
  const { showToast } = useToast();
  const { data: response, error, isPending, isFetching } = useAdminOrders();
  const { updateStatus, remove } = useAdminOrderMutations();
  const orders = (response?.data || []).map((order) => ({
    ...order,
    reference: order.reference,
    customer: { name: order.customerName, email: order.customerEmail, phone: order.customerPhone },
    items: order.items.map((item) => ({ name: item.productName, quantity: item.quantity, price: Number(item.unitPrice) })),
    total: Number(order.total),
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus.toLowerCase(),
    orderStatus: order.orderStatus.toLowerCase(),
    delivery: order.deliveryRequired,
    address: order.deliveryAddress,
    createdAt: new Date(order.createdAt).toLocaleDateString(),
  }));
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.reference.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customer.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        order.orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status: newStatus.toUpperCase() });
      showToast("Order status updated.", "success");
    } catch (updateError) {
      showToast(updateError.message || "Unable to update order status.", "error");
    }
  };

  const deleteOrder = async () => {
    try {
      await remove.mutateAsync(orderToDelete.id);
      setOrderToDelete(null);
      if (selectedOrder?.id === orderToDelete.id) setSelectedOrder(null);
      showToast("Order deleted.", "success");
    } catch (deleteError) {
      showToast(deleteError.message || "Unable to delete order.", "error");
    }
  };

  return (
    <Section className="py-8 lg:py-10">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Admin
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-tight">
          Orders
        </h1>

        <p className="mt-4 max-w-xl text-neutral-600">
          Manage customer orders, payment statuses, and fulfilment.
        </p>
      </div>

      {/* Filters */}

      {error && <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error.message}</div>}

      {isFetching && !isPending && <p className="mb-4 text-xs text-neutral-500">Updating orders...</p>}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by order, name, or email..."
            className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-black"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm outline-none focus:border-black"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders */}

      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
        <div className="hidden grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-6 border-b border-neutral-200 bg-neutral-50 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 lg:grid">
          <span>Order</span>
          <span>Customer</span>
          <span>Payment</span>
          <span>Order Status</span>
          <span>Total</span>
          <span></span>
        </div>

        <div className="divide-y divide-neutral-200">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="grid gap-5 px-6 py-6 lg:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] lg:items-center lg:gap-6"
            >
              {/* Order */}

              <div>
                <p className="font-bold">{order.reference}</p>

                <p className="mt-1 text-xs text-neutral-500">
                  {order.createdAt}
                </p>
              </div>

              {/* Customer */}

              <div>
                <p className="font-semibold">
                  {order.customer.name}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  {order.customer.email}
                </p>
              </div>

              {/* Payment */}

              <div>
                <p className="text-sm font-semibold">
                  {order.paymentMethod}
                </p>

                {/*<div className="mt-2">
                  <StatusBadge
                    status={order.paymentStatus}
                  />
                </div>*/}
              </div>

              {/* Order Status */}

              <div>
                <StatusBadge
                  status={order.orderStatus}
                />

                <select
                  value={order.orderStatus}
                  onChange={(event) =>
                    updateOrderStatus(
                      order.id,
                      event.target.value,
                    )
                  }
                  className="mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-xs outline-none focus:border-black"
                >
                  <option value="pending">
                    Pending
                  </option>

                  <option value="processing">
                    Processing
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                  <option value="cancelled">
                    Cancelled
                  </option>
                </select>
              </div>

              {/* Total */}

              <p className="font-bold">
                GH₵ {order.total.toFixed(2)}
              </p>

              {/* View */}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 transition hover:bg-black hover:text-white"
                  title="View order"
                >
                  <Eye size={17} />
                </button>
                <button
                  onClick={() => setOrderToDelete(order)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-600 hover:text-white"
                  title="Delete order"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="px-6 py-20 text-center">
            <p className="text-lg font-semibold">
              No orders found.
            </p>

            <p className="mt-2 text-sm text-neutral-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      <AdminModal
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order ${selectedOrder.reference}` : "Order details"}
        description="Detailed order information and fulfilment summary."
        size="xl"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <DetailBlock label="Order reference" value={selectedOrder.reference} />
              <DetailBlock label="Customer name" value={selectedOrder.customer.name} />
              <DetailBlock label="Email" value={selectedOrder.customer.email} />
              <DetailBlock label="Phone" value={selectedOrder.customer.phone} />
              <DetailBlock label="Order date" value={selectedOrder.createdAt} />
              <DetailBlock label="Payment method" value={selectedOrder.paymentMethod} />
              <DetailBlock label="Payment status" value={selectedOrder.paymentStatus} />
              <DetailBlock label="Order status" value={selectedOrder.orderStatus} />
              <DetailBlock label="Delivery status" value={selectedOrder.delivery ? "Enabled" : "Not enabled"} />
            </div>

            {selectedOrder.delivery && selectedOrder.address && (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Delivery address
                </p>
                <p className="mt-2 text-sm text-neutral-700">{selectedOrder.address}</p>
              </div>
            )}

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Ordered items
              </p>

              <div className="mt-4 space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3">
                    <div>
                      <p className="font-semibold text-neutral-900">{item.name}</p>
                      <p className="text-sm text-neutral-500">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">
                      GH₵ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-black p-4 text-white sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-300">
                Total amount
              </p>
              <p className="text-2xl font-black">GH₵ {selectedOrder.total.toFixed(2)}</p>
            </div>
          </div>
        )}
      </AdminModal>
      <DeleteConfirmationModal
        isOpen={Boolean(orderToDelete)}
        onClose={() => setOrderToDelete(null)}
        onConfirm={deleteOrder}
        isDeleting={remove.isPending}
        title="Delete order?"
        itemLabel={orderToDelete?.reference || "this order"}
      />
    </Section>
  );
}

function DetailBlock({ label, value }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-neutral-900">{value}</p>
    </div>
  );
}