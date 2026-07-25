import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, ShoppingCart, Users, TrendingUp, Package, BarChart3 } from "lucide-react";
import { KpiCard } from "~/components/KpiCard";
import { mockAnalytics } from "~/lib/mock-data";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const a = mockAnalytics;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">
          Overview of your DropAI store performance
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value={a.totalRevenue.toLocaleString()}
          prefix="$"
          change={12.5}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <KpiCard
          title="Total Orders"
          value={a.totalOrders}
          change={8.2}
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <KpiCard
          title="Visitors"
          value={a.totalVisitors.toLocaleString()}
          change={-3.1}
          icon={<Users className="h-5 w-5" />}
        />
        <KpiCard
          title="Conversion Rate"
          value={`${a.conversionRate}%`}
          change={0.8}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* Secondary KPIs + Chart placeholder */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Chart placeholder */}
        <div className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Revenue Trend</h2>
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
          <div className="mt-4 flex h-48 items-end gap-2">
            {a.dailyRevenue.map((day) => {
              const maxRev = Math.max(...a.dailyRevenue.map((d) => d.revenue));
              const height = (day.revenue / maxRev) * 100;
              return (
                <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-medium text-gray-300">${day.revenue}</span>
                  <div
                    className="w-full rounded-t-md bg-indigo-500/70 transition-all hover:bg-indigo-500"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">
                    {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick stats */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-5">
            <p className="text-sm text-gray-400">Avg. Order Value</p>
            <p className="mt-1 text-xl font-bold text-white">${a.averageOrderValue.toFixed(2)}</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-5">
            <p className="text-sm text-gray-400">Return Rate</p>
            <p className="mt-1 text-xl font-bold text-white">{a.returnRate}%</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-5">
            <p className="text-sm text-gray-400">Top Traffic Channel</p>
            <p className="mt-1 text-xl font-bold text-white">{a.topTrafficChannel}</p>
          </div>
        </div>
      </div>

      {/* Recent products placeholder */}
      <div className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-6">
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-indigo-400" />
          <h2 className="text-lg font-semibold text-white">Product Catalog</h2>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          30 products across tech accessories, health &amp; wellness, and home goods.
          Visit the <a href="/products" className="text-indigo-400 hover:underline">Products page</a> to browse the full catalog.
        </p>
      </div>
    </div>
  );
}
