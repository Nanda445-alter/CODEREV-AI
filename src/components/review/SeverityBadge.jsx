import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";

const config = {
  critical: {
    bg: "bg-red-500/10 border-red-500/20",
    text: "text-red-400",
    dot: "bg-red-500",
    icon: AlertCircle,
    label: "Critical",
  },
  high: {
    bg: "bg-orange-500/10 border-orange-500/20",
    text: "text-orange-400",
    dot: "bg-orange-500",
    icon: AlertTriangle,
    label: "High",
  },
  medium: {
    bg: "bg-amber-500/10 border-amber-500/20",
    text: "text-amber-400",
    dot: "bg-amber-500",
    icon: Info,
    label: "Medium",
  },
  low: {
    bg: "bg-emerald-500/10 border-emerald-500/20",
    text: "text-emerald-400",
    dot: "bg-emerald-500",
    icon: CheckCircle,
    label: "Low",
  },
};

export default function SeverityBadge({ severity }) {
  const s = severity?.toLowerCase() || "medium";
  const c = config[s] || config.medium;
  const Icon = c.icon;

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border transition-all-smooth hover:scale-105", c.bg, c.text)}>
      <Icon className="w-3 h-3" />
      {c.label}
    </span>
  );
}