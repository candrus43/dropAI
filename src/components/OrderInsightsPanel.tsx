import { useState } from "react";
import {
  Brain,
  ChevronDown,
  AlertTriangle,
  TrendingUp,
  Info,
  CheckCircle,
} from "lucide-react";
import type { OrderInsight } from "~/lib/order-insights";

interface OrderInsightsPanelProps {
  insights: OrderInsight[];
}

const iconMap = {
  warning: AlertTriangle,
  positive: TrendingUp,
  info: Info,
};

const colorMap = {
  warning: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-400",
    label: "Warning",
    labelBg: "bg-amber-500/20",
  },
  positive: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-400",
    label: "Opportunity",
    labelBg: "bg-emerald-500/20",
  },
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-400",
    label: "Info",
    labelBg: "bg-blue-500/20",
  },
};

function groupByType(insights: OrderInsight[]) {
  const grouped: Record<OrderInsight["type"], OrderInsight[]> = {
    warning: [],
    positive: [],
    info: [],
  };
  for (const insight of insights) {
    grouped[insight.type].push(insight);
  }
  return grouped;
}

export function OrderInsightsPanel({ insights }: OrderInsightsPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const grouped = groupByType(insights);
  const warningCount = grouped.warning.length;

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#1a1d27]">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20">
            <Brain className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              Order Intelligence
            </h2>
            <p className="text-xs text-gray-500">
              {warningCount === 0
                ? "All clear — no issues detected"
                : `${warningCount} issue${warningCount > 1 ? "s" : ""} need${warningCount === 1 ? "s" : ""} attention`}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      {expanded && (
        <div className="border-t border-white/[0.06] px-5 pb-5 pt-4">
          {warningCount === 0 &&
          grouped.positive.length === 0 &&
          grouped.info.length === 0 ? (
            <div className="flex items-center gap-3 rounded-lg bg-emerald-500/10 px-4 py-3">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-gray-200">
                All clear — no issues detected in your order data.
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Warnings first */}
              {grouped.warning.length > 0 && (
                <InsightGroup
                  label="Warnings"
                  insights={grouped.warning}
                  color="warning"
                />
              )}

              {/* Opportunities */}
              {grouped.positive.length > 0 && (
                <InsightGroup
                  label="Opportunities"
                  insights={grouped.positive}
                  color="positive"
                />
              )}

              {/* Info */}
              {grouped.info.length > 0 && (
                <InsightGroup
                  label="Insights"
                  insights={grouped.info}
                  color="info"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InsightGroup({
  label,
  insights,
  color,
}: {
  label: string;
  insights: OrderInsight[];
  color: "warning" | "positive" | "info";
}) {
  const c = colorMap[color];
  const Icon = iconMap[color];

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Icon className={`h-4 w-4 ${c.icon}`} />
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${c.labelBg} ${c.icon}`}>
          {label}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, i) => (
          <div
            key={i}
            className={`rounded-lg border ${c.border} ${c.bg} p-3`}
          >
            <p className="text-sm font-medium text-white">{insight.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-400">
              {insight.description}
            </p>
            {insight.metric && (
              <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${c.labelBg} ${c.icon}`}>
                {insight.metric}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
