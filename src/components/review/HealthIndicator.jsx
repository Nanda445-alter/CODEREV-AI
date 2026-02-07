import React from "react";
import { Activity, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HealthIndicator({ analysis }) {
  if (!analysis?.issues) return null;

  const issues = analysis.issues;
  const criticalCount = issues.filter(i => i.severity?.toLowerCase() === "critical").length;
  const highCount = issues.filter(i => i.severity?.toLowerCase() === "high").length;
  const totalIssues = issues.length;

  const getHealthStatus = () => {
    if (criticalCount > 0) return { label: "Critical Issues", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: XCircle };
    if (highCount > 2) return { label: "Needs Attention", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: AlertTriangle };
    if (totalIssues > 5) return { label: "Could Improve", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: Activity };
    if (totalIssues === 0) return { label: "Excellent", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: CheckCircle };
    return { label: "Good", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", icon: CheckCircle };
  };

  const health = getHealthStatus();
  const Icon = health.icon;

  return (
    <div className={cn("glass-card-strong p-4 rounded-xl border hover-lift animate-slide-up", health.border)} style={{animationDelay: '0.3s', opacity: 0}}>
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", health.bg)}>
          <Icon className={cn("w-5 h-5", health.color)} />
        </div>
        <div className="flex-1">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Code Health</div>
          <div className={cn("text-lg font-bold", health.color)}>{health.label}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-300">{totalIssues}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Issues</div>
        </div>
      </div>
    </div>
  );
}