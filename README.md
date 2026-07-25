# DropAI ⚡ — AI-Powered Dropshipping Dashboard

> **Zero inventory. Maximum profit.** DropAI is an intelligent dropshipping dashboard that uses AI to find trending products, write conversion-focused copy, analyze store performance, and recover lost sales — so you can focus on scaling your business.

---

## Overview

DropAI is a full-stack web application built for dropshippers who want to run a profitable online store without the overhead of inventory, warehousing, or staff. The platform connects to five major dropshipping suppliers (AliExpress, CJDropshipping, Spocket, Zendrop, and Printful), and provides a unified dashboard to manage products, orders, analytics, and automated email campaigns — all powered by an AI assistant.

### The Problem

Traditional dropshipping requires hours of product research, manual copywriting, spreadsheets for tracking margins, fragmented analytics across platforms, and constant customer follow-up. Most tools address one piece of the puzzle — DropAI brings everything together with AI at the center.

### The Solution

A single dashboard where you can discover profitable products, generate product descriptions and ad scripts in one click, track order patterns with AI insights, manage supplier relationships, and run automated email campaigns — all without leaving the app. The AI assistant (powered by OpenAI GPT-4o-mini) understands your store's data and helps you make smarter decisions faster.

---

## Features

- **AI-Powered Product Discovery** — Find trending, high-margin products across 5 supplier platforms. The AI suggests complementary products, identifies catalog gaps, and recommends what to source next.

- **Smart Copywriting** — Generate product descriptions, ad scripts (TikTok, Reels, commercials), and email copy in one click. Optimized for conversions with persuasive language and clear calls to action.

- **Real-Time Store Analytics** — Track revenue, conversion rate, average order value, visitor traffic, return rate, and top traffic channels. View daily revenue trends with bar charts and identify what's working.

- **Order Intelligence with AI Insights** — Order tracking from payment to delivery with AI-powered pattern analysis. Automatically detects shipping delays, payment failures, high cancellation rates, peak order days, and returning customer trends.

- **Supplier Management** — Manage 5 major dropshipping platforms from one dashboard. Compare product counts, average shipping times, ratings, and connection status at a glance.

- **5 Automated Email Campaigns** — Welcome series, order confirmation, shipping notifications, abandoned cart recovery, and supplier outreach. Each with tracking for open rates and click rates.

- **Conversational AI Assistant** — Ask natural-language questions about your store. Get analytics summaries, product ideas, niche suggestions, and creative copy. The assistant understands context and your store's current data.

- **30 Curated Products** — A catalog of 30 products across 3 categories (Tech Accessories, Health & Wellness, Home Goods) with cost, price, and margin visible.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **[TanStack Start](https://tanstack.com/start)** | Full-stack React framework (SSR, server functions, file-based routing) |
| **[React 19](https://react.dev/)** | UI library |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first styling (dark theme) |
| **[TypeScript](https://www.typescriptlang.org/)** | Type safety |
| **[Neon](https://neon.tech/)** | Serverless Postgres database |
| **[OpenAI API](https://openai.com/)** | GPT-4o-mini for AI assistant |
| **[Vite](https://vite.dev/)** | Build tool and dev server |
| **[Lucide React](https://lucide.dev/)** | Icon library |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.2+)
- [OpenAI API key](https://platform.openai.com/api-keys) (optional — AI chat works with a graceful fallback without it)

### Setup

```bash
git clone https://github.com/candrus43/dropAI.git
cd dropAI
bun install
bun run dev
```

The development server starts at `http://localhost:3000`.

### Optional: Connect a Database

DropAI uses Neon (serverless Postgres) for persistent storage. When you're ready to move beyond mock data:

1. Create a free Neon project at [neon.tech](https://neon.tech)
2. Copy the connection string
3. Set it as `DATABASE_URL` (see Environment Variables below)

The app works with mock data out of the box — a database is only needed when you want to persist real data.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Required for database connectivity
DATABASE_URL=postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Optional — enables the AI chat assistant
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | No (mock data works) | Neon Postgres connection string for persistent storage |
| `OPENAI_API_KEY` | No (graceful fallback) | OpenAI API key to enable GPT-4o-mini assistant |

> **Note:** When `OPENAI_API_KEY` is not set, the AI assistant returns a friendly message saying it's not configured. All other features work normally.

---

## Project Structure

```
dropAI/
 src/
   ├── components/
   │   ├── AiChatPanel.tsx        # Floating AI chat assistant UI
   │   ├── DashboardShell.tsx     # Layout shell with sidebar + chat
   │   ├── DashboardPageShell.tsx # Wrapper for page content
   │   ├── KpiCard.tsx            # Reusable KPI metric card
   │   ├── OrderInsightsPanel.tsx # AI order pattern insights display
   │   └── Sidebar.tsx            # Navigation sidebar
   │
   ├── lib/
   │   ├── ai.ts                  # AI chat server function (OpenAI)
   │   ├── mock-data.ts           # 30 products, 20 orders, 5 suppliers
   │   ├── order-insights.ts      # AI order pattern analysis logic
   │   └── types.ts               # TypeScript interfaces
   │
   ├── routes/
   │   ├── __root.tsx             # Root layout (head, HTML shell)
   │   ├── index.tsx              # Landing page ("/")
   │   ├── dashboard.tsx          # Dashboard overview ("/dashboard")
   │   ├── products.tsx           # Product catalog ("/products")
   │   ├── orders.tsx             # Order management ("/orders")
   │   ├── suppliers.tsx          # Supplier management ("/suppliers")
   │   └── analytics.tsx          # Deep analytics ("/analytics")
   │
   ├── styles/
   │   └── app.css                # Tailwind entry + base styles
   │
   ├── db.ts                      # Neon serverless DB connection
   ├── router.tsx                 # Router configuration
   └── routeTree.gen.ts           # Auto-generated route tree

 serve.ts                       # Production server entry
 vite.config.ts                 # Vite configuration
 tsconfig.json                  # TypeScript configuration
 package.json
 publish.sh                     # Build + publish script
 go-live.sh                     # Production deployment script
 build-vercel.sh                # Vercel build adapter
 vercel-entry.ts                # Vercel function entry point
 site.json                      # Business name config
 SITE.md                        # Site management guide
```

### Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing page | Marketing page with features, stats, and CTA |
| `/dashboard` | Dashboard | Revenue, orders, visitors, conversion KPIs + chart |
| `/products` | Products | 30-product catalog with cost/price/margin |
| `/orders` | Orders | 20-order table with AI-powered pattern insights |
| `/suppliers` | Suppliers | 5 supplier connection cards |
| `/analytics` | Analytics | Deep metrics: traffic sources, email performance, daily revenue |

---

## Deployment

### Preview (port 3000)

The app runs on port 3000. After making changes:

```bash
bun run publish
```

This rebuilds the application and restarts the server. The live preview is available at `https://c4c1e3b23a27075a9472e74dcc114458.ctonew.app`.

### Production (Vercel)

To deploy to production on Vercel:

```bash
export VERCEL_TOKEN=your_vercel_token
bun run go-live
```

The `go-live.sh` script bundles the SSR handler, deploys it to Vercel, makes the project public, and prints the live URL.

---

## API Reference

### Server Functions

| Function | Route | Description |
|---|---|---|
| `sendChatMessage` | POST `/` (tanstack server fn) | Sends a user message to the OpenAI-powered AI assistant. Accepts `message` (string) and `history` (array of chat messages). Returns an AI response message. |

### Data Sources

All current data comes from mock data in `src/lib/mock-data.ts`:

- **Products** — 30 items across Tech Accessories, Health & Wellness, Home Goods
- **Orders** — 20 orders in various statuses (pending, processing, shipped, delivered, cancelled)
- **Suppliers** — 5 platforms (AliExpress, CJDropshipping, Spocket, Zendrop, Printful)
- **Analytics** — Aggregated KPIs with 7-day revenue history
- **Email Campaigns** — 5 automated campaigns with performance metrics

---

## Contributing

Contributions are welcome! Here's how to help:

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feat/your-feature`
3. **Make your changes** with clear, descriptive commits
4. **Push** to your branch: `git push origin feat/your-feature`
5. **Open a Pull Request** against the `main` branch

### Code Standards

- Follow the existing TypeScript strict patterns
- Use the dark theme design system (`bg-[#0f1117]`, indigo accent)
- Place mock data in `src/lib/mock-data.ts` and types in `src/lib/types.ts`
- Shared UI components go in `src/components/`, page components in `src/routes/`
- Server-only code (DB queries, API calls) must stay in server functions, never client code

---

## License

MIT — see [LICENSE](./LICENSE) for details.

---

<div align="center">
  <strong>Built for dropshippers who want to scale without the headache.</strong>
  <br /><br />
  <a href="https://github.com/candrus43/dropAI">GitHub</a> ·
  <a href="https://c4c1e3b23a27075a9472e74dcc114458.ctonew.app">Live Demo</a>
</div>
