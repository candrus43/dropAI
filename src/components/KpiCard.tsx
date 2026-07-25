import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  prefix?: string;
}

export function KpiCard({ title, value, change, icon, prefix = "" }: KpiCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const isNegative = change !== undefined && change < 0;
  const changeColor = isPositive ? "text-emerald-400" : isNegative ? "text-red-400" : "";

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#1a1d27] p-5 transition-colors hover:border-white/[0.10]">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white">
            {prefix}
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            {icon}
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          {isPositive ? (
            <TrendingUp className={`h-4 w-4 ${changeColor}`} />
          ) : (
            <TrendingDown className={`h-4 w-4 ${changeColor}`} />
          )}
          <span className={`text-sm font-medium ${changeColor}`}>
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-gray-500">vs last week</span>
        </div>
      )}
    </div>
  );
}
