import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart, Clock, CheckCircle, XCircle, Truck, Search } from "lucide-react";
import { mockOrders } from "~/lib/mock-data";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

const statusConfig: Record<string, { icon: typeof ShoppingCart; color: string; bg: string }> = {
  delivered: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  shipped: { icon: Truck, color: "text-blue-400", bg: "bg-blue-500/10" },
  processing: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
  pending: { icon: Clock, color: "text-gray-400", bg: "bg-gray-500/10" },
  cancelled: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
};

function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="mt-1 text-sm text-gray-400">Track and manage customer orders</p>
      </div>

      {/* Search + filters placeholder */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-3 rounded-lg border border-white/[0.06] bg-[#1a1d27] px-4 py-2.5">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search orders by customer, product or ID..."
            className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
          />
        </div>
      </div>

      {/* Orders table */}
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#1a1d27]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {mockOrders.map((order) => {
              const status = statusConfig[order.status] ?? statusConfig.pending;
              const StatusIcon = status.icon;
              return (
                <tr key={order.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-sm font-medium text-white">{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-200">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200">×{order.quantity} {order.productName}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.bg} ${status.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        order.paymentStatus === "paid"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : order.paymentStatus === "refunded"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
