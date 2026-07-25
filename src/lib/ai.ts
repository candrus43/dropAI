import { createServerFn } from "@tanstack/react-start";
import OpenAI from "openai";
import type { ChatMessage } from "./types";
import {
  mockProducts,
  mockOrders,
  mockSuppliers,
  mockAnalytics,
  mockEmailCampaigns,
} from "./mock-data";

// ── Base system prompt ──────────────────────────────────────────────

const BASE_SYSTEM_PROMPT = `You are DropAI Assistant, an AI-powered e-commerce advisor for a dropshipping store
called DropAI. You help the store owner discover trending products, write product
descriptions, create advertising scripts, analyze store performance, and suggest
profitable niches.

You have access to the store's current data: products, orders, analytics, suppliers,
and email campaigns. When asked about store data, answer based on the provided context.
When asked for creative work (copywriting, ad scripts), be professional, persuasive,
and conversion-focused.

Be concise by default. Use bullet points for lists. When suggesting products, include
estimated margins when possible. Always maintain a helpful, proactive tone.`;

// ── Context builders ────────────────────────────────────────────────

function buildProductsContext(): string {
  const products = mockProducts.slice(0, 15);
  return products
    .map(
      (p) =>
        `- ${p.name} (${p.category}) | Cost: $${p.cost} | Price: $${p.price} | Margin: ${p.margin}% | Supplier: ${p.supplierId}`,
    )
    .join("\n");
}

function buildAnalyticsContext(): string {
  const a = mockAnalytics;
  return `Store Analytics:
- Total Revenue: $${a.totalRevenue.toLocaleString()}
- Total Orders: ${a.totalOrders}
- Total Visitors: ${a.totalVisitors.toLocaleString()}
- Conversion Rate: ${a.conversionRate}%
- Average Order Value: $${a.averageOrderValue.toFixed(2)}
- Return Rate: ${a.returnRate}%
- Top Traffic Channel: ${a.topTrafficChannel}

Recent orders summary: ${mockOrders.length} orders, ${mockOrders.filter((o) => o.status === "delivered").length} delivered, ${mockOrders.filter((o) => o.status === "processing").length} processing.

Email Campaigns:
${mockEmailCampaigns
  .map((c) => `- ${c.name} (${c.type}): ${c.openRate}% open rate, ${c.clickRate}% click rate, ${c.sentCount} sent`)
  .join("\n")}`;
}

function buildSuppliersContext(): string {
  return mockSuppliers
    .map(
      (s) =>
        `- ${s.name} (${s.platform}): ${s.productCount} products, ${s.averageShippingDays} day avg shipping, ${s.rating}/5 rating, status: ${s.status}`,
    )
    .join("\n");
}

// ── Intent detection ────────────────────────────────────────────────

type Intent =
  | "analytics"
  | "discovery"
  | "copywriting"
  | "ad_script"
  | "niche"
  | "general";

function detectIntent(message: string): Intent {
  const lower = message.toLowerCase();

  if (/(?:analytics|revenue|conversion|order|metric|performance)/.test(lower)) {
    return "analytics";
  }
  if (/(?:trending|find product|discover|product research)/.test(lower)) {
    return "discovery";
  }
  if (/(?:describe|description|write|copy|rewrite)/.test(lower)) {
    return "copywriting";
  }
  if (/(?:ad\b|script|commercial|tiktok|reel|advertisement)/.test(lower)) {
    return "ad_script";
  }
  if (/(?:niche|suggest|category|market)/.test(lower)) {
    return "niche";
  }
  return "general";
}

function buildIntentPrompt(intent: Intent): string {
  switch (intent) {
    case "analytics":
      return `${BASE_SYSTEM_PROMPT}

The user is asking about store analytics. Here is the current store data:

${buildAnalyticsContext()}

Use this data to answer the user's question. Reference specific metrics by name. If the user asks about trends or comparisons, do your best to infer from the available data. Suggest actionable improvements based on the numbers.`;

    case "discovery":
      return `${BASE_SYSTEM_PROMPT}

The user is looking for trending or profitable product ideas. Here are the current products in the store:

${buildProductsContext()}

Use this to suggest complementary products, identify gaps in the catalog, or recommend what to source next. Focus on products with strong margins and trending categories. Be specific about why a product would sell well.`;

    case "copywriting":
      return `${BASE_SYSTEM_PROMPT}

The user wants help with copywriting — product descriptions, marketing copy, or similar. Here are the store's current products for reference:

${buildProductsContext()}

Write compelling, conversion-focused copy. Use persuasive language, highlight benefits over features, and include a clear call to action when appropriate. Format your response for easy copying into the store.`;

    case "ad_script":
      return `${BASE_SYSTEM_PROMPT}

The user needs an advertising script (video ad, TikTok/Reel script, or similar). Here are the store's products for reference:

${buildProductsContext()}

Create a punchy, engaging ad script. For video platforms, include timing cues and visual directions. Hook the viewer in the first 2 seconds, showcase the product benefit, and include a clear call to action. Keep it under 60 seconds for short-form video.`;

    case "niche":
      return `${BASE_SYSTEM_PROMPT}

The user wants niche or category suggestions. Here is the store's current state:

Products catalog categories: ${[...new Set(mockProducts.map((p) => p.category))].join(", ")}

Suppliers:
${buildSuppliersContext()}

Suggest profitable niches based on the store's supplier network and current categories. Include estimated margins, target audience, and why the niche has potential. Be specific and data-driven.`;

    default:
      return BASE_SYSTEM_PROMPT;
  }
}

// ── Input schema ────────────────────────────────────────────────────

interface AiChatInput {
  message: string;
  history: ChatMessage[];
}

// ── Server function ─────────────────────────────────────────────────

export const sendChatMessage = createServerFn({ method: "POST" })
  .validator((data: unknown): AiChatInput => {
    const d = data as Record<string, unknown>;
    if (typeof d?.message !== "string" || !d.message.trim()) {
      throw new Error("message is required and must be a non-empty string");
    }
    if (!Array.isArray(d?.history)) {
      throw new Error("history is required and must be an array");
    }
    return {
      message: d.message as string,
      history: d.history as ChatMessage[],
    };
  })
  .handler(async ({ data }): Promise<ChatMessage> => {
    const apiKey = process.env.OPENAI_API_KEY;

    // Graceful fallback when no API key is configured
    if (!apiKey) {
      return {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content:
          "The AI assistant isn't configured yet. Set OPENAI_API_KEY to enable me.",
        timestamp: new Date().toISOString(),
      };
    }

    const openai = new OpenAI({ apiKey });

    const intent = detectIntent(data.message);
    const systemPrompt = buildIntentPrompt(intent);

    // Build messages array: system prompt + last 10 history messages + current user message
    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [{ role: "system", content: systemPrompt }];

    // Include last 10 messages from history for context (excluding the welcome greeting if it's the only one)
    const recentHistory = data.history.slice(-10);
    for (const msg of recentHistory) {
      if (msg.role === "user" || msg.role === "assistant") {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    // Add the current user message
    messages.push({ role: "user", content: data.message });

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const content =
        completion.choices[0]?.message?.content ??
        "I'm sorry, I couldn't generate a response. Please try again.";

      return {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("OpenAI API error:", error);
      return {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content:
          "AI is unavailable right now. Please check your API key and try again later.",
        timestamp: new Date().toISOString(),
      };
    }
  });
