import { createFileRoute } from "@tanstack/react-router";
import { Package, Plus, Search } from "lucide-react";
import { DashboardPageShell } from "~/components/DashboardPageShell";
import { mockProducts } from "~/lib/mock-data";

export const Route = createFileRoute("/products")({
  component: () => (
    <DashboardPageShell>
      <ProductsPage />
    </DashboardPageShell>
  ),
});

function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your product catalog across all suppliers
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Search bar placeholder */}
      <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-[#1a1d27] px-4 py-2.5">
        <Search className="h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
        />
      </div>

      {/* Product grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-4 transition-colors hover:border-white/[0.10]"
          >
            <div className="mb-3 flex h-40 items-center justify-center rounded-lg bg-[#0f1117]">
              <Package className="h-12 w-12 text-gray-600" />
            </div>
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-white">{product.name}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    product.inStock
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <p className="text-xs text-gray-500">{product.category}</p>
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-2">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-semibold text-white">${product.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Margin</p>
                  <p className="font-semibold text-emerald-400">{product.margin}%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Cost</p>
                  <p className="font-semibold text-gray-400">${product.cost}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
