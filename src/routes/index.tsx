import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Zap,
  Sparkles,
  PenLine,
  BarChart3,
  Mail,
  ShieldCheck,
  Truck,
  Package,
  ArrowRight,
  Star,
  ChevronRight,
  TrendingUp,
  ShoppingCart,
  Users,
  DollarSign,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ─── Feature Card ─── */
function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Zap;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-xl border border-white/[0.06] bg-[#1a1d27] p-6 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500/20">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </div>
  );
}

/* ─── Stat Item ─── */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-gray-400">{label}</p>
    </div>
  );
}

/* ─── Landing Page ─── */
function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* ─── NAV ─── */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#0f1117]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">DropAI</span>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            Launch App
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-sm text-indigo-300">
              <Sparkles className="h-4 w-4" />
              AI-Powered Dropshipping Platform
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              AI-Powered Dropshipping.
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Zero Inventory. Maximum Profit.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              DropAI finds trending products, writes your copy, analyzes your
              store, and recovers lost sales — so you can focus on scaling.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] sm:w-auto"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.10] px-8 py-3.5 text-base font-semibold text-gray-300 transition-all duration-200 hover:border-white/[0.20] hover:text-white sm:w-auto"
              >
                See Features
                <ChevronRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* ─── Dashboard Preview/Mockup ─── */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#1a1d27] shadow-2xl shadow-indigo-500/5">
              {/* Mock browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-amber-500/60" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
                <div className="ml-4 flex-1 rounded-md bg-[#0f1117] px-3 py-1.5 text-center text-xs text-gray-500">
                  app.dropai.com/dashboard
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { icon: DollarSign, label: "Revenue", value: "$12,847", change: "+12.5%", color: "text-emerald-400" },
                    { icon: ShoppingCart, label: "Orders", value: "342", change: "+8.2%", color: "text-emerald-400" },
                    { icon: Users, label: "Visitors", value: "8,241", change: "-3.1%", color: "text-red-400" },
                    { icon: TrendingUp, label: "Conv. Rate", value: "3.2%", change: "+0.8%", color: "text-emerald-400" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-[#0f1117] p-4">
                      <div className="flex items-center justify-between">
                        <stat.icon className="h-4 w-4 text-gray-500" />
                        <span className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-gray-500">{stat.label}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
                {/* Chart area */}
                <div className="mt-4 flex h-20 items-end gap-2 rounded-lg bg-[#0f1117] px-4 py-3">
                  {[35, 55, 45, 70, 60, 85, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-indigo-500/40 transition-all hover:bg-indigo-500/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="border-y border-white/[0.06] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatItem value="30+" label="Products Across 3 Categories" />
            <StatItem value="5" label="Connected Suppliers" />
            <StatItem value="AI" label="Powered Analytics" />
            <StatItem value="Zero" label="Inventory Risk" />
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Everything you need to dropship with AI
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Six powerful tools. One dashboard. Zero complexity.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Sparkles}
              title="AI Product Discovery"
              description="Finds winning products across AliExpress, CJDropshipping, Spocket, Zendrop, and Printful — so you never guess what to sell."
            />
            <FeatureCard
              icon={PenLine}
              title="Smart Copywriting"
              description="Product descriptions, ad scripts, and email campaigns generated in one click. Optimized for conversions."
            />
            <FeatureCard
              icon={BarChart3}
              title="Real-Time Analytics"
              description="Conversion rates, AOV, revenue trends, and traffic channel insights — all updated in real time."
            />
            <FeatureCard
              icon={Mail}
              title="Automated Recovery"
              description="5 automated email campaigns: welcome, order confirmation, shipping updates, abandoned cart recovery, and supplier outreach."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Order Intelligence"
              description="AI detects shipping delays and return patterns before they become problems — keep your customers happy."
            />
            <FeatureCard
              icon={Truck}
              title="Supplier Management"
              description="Manage 5 major suppliers from one dashboard. Compare shipping times, ratings, and product catalogs instantly."
            />
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="border-t border-white/[0.06] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-white/[0.06] bg-[#1a1d27] p-8 sm:p-10">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-lg leading-relaxed text-gray-300">
                "DropAI completely changed how I run my store. The AI product
                discovery saved me hours of research, and the abandoned cart
                recovery brought back 18% of lost sales — in the first week."
              </blockquote>
              <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-lg font-bold text-indigo-400">
                  S
                </div>
                <div>
                  <p className="font-semibold text-white">Sarah Mitchell</p>
                  <p className="text-sm text-gray-400">
                    Dropshipper, UrbanTrend Store
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted by */}
          <div className="mt-16 text-center">
            <p className="mb-8 text-sm font-medium uppercase tracking-widest text-gray-500">
              Trusted by dropshippers worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-sm font-semibold text-gray-600">
              <span className="text-lg">UrbanTrend</span>
              <span className="text-lg">GadgetFlow</span>
              <span className="text-lg">HomePure</span>
              <span className="text-lg">FitGear</span>
              <span className="text-lg">StyleDrop</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-white/[0.06] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
              <Layers className="h-7 w-7 text-indigo-400" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Ready to scale your dropshipping store?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              No inventory. No warehouse. No staff. Just AI — and your next
              big product.
            </p>
            <div className="mt-10">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-white">DropAI</span>
            </div>
            <p className="text-sm text-gray-500">
              Built for dropshippers who want to scale without the headache.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}