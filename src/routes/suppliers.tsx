import { createFileRoute } from "@tanstack/react-router";
import { Truck, Star, ExternalLink } from "lucide-react";
import { DashboardPageShell } from "~/components/DashboardPageShell";
import { mockSuppliers } from "~/lib/mock-data";

export const Route = createFileRoute("/suppliers")({
  component: () => (
    <DashboardPageShell>
      <SuppliersPage />
    </DashboardPageShell>
  ),
});

const platformColors: Record<string, string> = {
  AliExpress: "bg-orange-500/10 text-orange-400",
  CJDropshipping: "bg-blue-500/10 text-blue-400",
  Spocket: "bg-purple-500/10 text-purple-400",
  Zendrop: "bg-teal-500/10 text-teal-400",
  Printful: "bg-pink-500/10 text-pink-400",
};

function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Suppliers</h1>
        <p className="mt-1 text-sm text-gray-400">Manage your dropshipping supplier connections</p>
      </div>

      {/* Supplier cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-5 transition-colors hover:border-white/[0.10]"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f1117]">
                  <Truck className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{supplier.name}</h3>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${platformColors[supplier.platform] ?? "bg-gray-500/10 text-gray-400"}`}
                  >
                    {supplier.platform}
                  </span>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  supplier.status === "active"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-gray-500/10 text-gray-400"
                }`}
              >
                {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
              </span>
            </div>

            <div className="space-y-3 border-t border-white/[0.04] pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Products</span>
                <span className="font-medium text-white">{supplier.productCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Avg. Shipping</span>
                <span className="font-medium text-white">{supplier.averageShippingDays} days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Rating</span>
                <span className="inline-flex items-center gap-1 font-medium text-white">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {supplier.rating}
                </span>
              </div>
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] py-2 text-sm text-gray-400 transition-colors hover:bg-white/[0.04] hover:text-gray-200">
              <ExternalLink className="h-4 w-4" />
              View Supplier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
