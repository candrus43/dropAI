import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, RotateCcw } from "lucide-react";
import { DashboardPageShell } from "~/components/DashboardPageShell";
import { KpiCard } from "~/components/KpiCard";
import { mockAnalytics } from "~/lib/mock-data";

export const Route = createFileRoute("/analytics")({
  component: () => (
    <DashboardPageShell>
      <AnalyticsPage />
    </DashboardPageShell>
  ),
});

function AnalyticsPage() {
  const a = mockAnalytics;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-gray-400">Deep insights into your store performance</p>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Conversion Rate"
          value={`${a.conversionRate}%`}
          change={0.8}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <KpiCard
          title="Average Order Value"
          value={a.averageOrderValue.toFixed(2)}
          prefix="$"
          change={5.3}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <KpiCard
          title="Return Rate"
          value={`${a.returnRate}%`}
          change={-0.5}
          icon={<RotateCcw className="h-5 w-5" />}
        />
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Daily Revenue</h2>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex h-56 items-end gap-3">
            {a.dailyRevenue.map((day) => {
              const maxRev = Math.max(...a.dailyRevenue.map((d) => d.revenue));
              const height = (day.revenue / maxRev) * 100;
              return (
                <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-medium text-gray-300">${day.revenue}</span>
                  <div
                    className="w-full rounded-t-lg bg-indigo-500/60 transition-all hover:bg-indigo-500"
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
      </div>

      {/* Detail stats */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-6">
          <h2 className="text-lg font-semibold text-white">Traffic Sources</h2>
          <div className="mt-4 space-y-3">
            {[
              { source: "Instagram Ads", value: 42, color: "bg-indigo-500" },
              { source: "TikTok Organic", value: 28, color: "bg-pink-500" },
              { source: "Google Search", value: 18, color: "bg-emerald-500" },
              { source: "Direct", value: 12, color: "bg-amber-500" },
            ].map((src) => (
              <div key={src.source}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{src.source}</span>
                  <span className="font-medium text-white">{src.value}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#0f1117]">
                  <div
                    className={`h-full rounded-full ${src.color}`}
                    style={{ width: `${src.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-6">
          <h2 className="text-lg font-semibold text-white">Email Campaign Performance</h2>
          <div className="mt-4 space-y-4">
            {[
              { name: "Welcome Series", openRate: 68.4, clickRate: 24.1 },
              { name: "Order Confirmation", openRate: 92.3, clickRate: 45.7 },
              { name: "Shipping Updates", openRate: 88.9, clickRate: 52.3 },
              { name: "Cart Recovery", openRate: 45.2, clickRate: 18.9 },
            ].map((campaign) => (
              <div key={campaign.name} className="flex items-center justify-between border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-gray-300">{campaign.name}</span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">
                    Open: <span className="font-medium text-white">{campaign.openRate}%</span>
                  </span>
                  <span className="text-gray-500">
                    Click: <span className="font-medium text-white">{campaign.clickRate}%</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
