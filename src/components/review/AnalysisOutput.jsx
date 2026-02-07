import React from "react";
import { ClipboardCheck, ChevronDown, ChevronUp, Lightbulb, Bug, Shield, Zap } from "lucide-react";
import SeverityBadge from "./SeverityBadge";
import ReactMarkdown from "react-markdown";

const categoryIcons = {
  bug: Bug,
  security: Shield,
  performance: Zap,
  suggestion: Lightbulb,
};

/**
 * @type {React.ForwardRefExoticComponent<{issue: any, index: number}>}
 */
const IssueCard = React.forwardRef(function IssueCard({ issue, index }, ref) {
  const [expanded, setExpanded] = React.useState(index < 3);
  const CategoryIcon = categoryIcons[issue.category?.toLowerCase()] || Lightbulb;

  return (
    <div 
      className="glass-card rounded-xl hover:bg-[#111119]/60 transition-all-smooth overflow-hidden hover-lift animate-slide-up"
      ref={ref}
      style={{animationDelay: `${index * 0.05}s`, opacity: 0}}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition-all-smooth"
      >
        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-800/60 flex items-center justify-center">
          <CategoryIcon className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-200 truncate">
            {issue.title || issue.description?.slice(0, 60) || `Issue ${index + 1}`}
          </p>
          {issue.line && (
            <span className="text-[11px] text-slate-500 code-font">Line {issue.line}</span>
          )}
        </div>
        <SeverityBadge severity={issue.severity} />
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-slate-800/50">
          <div className="prose prose-sm prose-invert max-w-none mt-3 text-slate-400 text-[13px] leading-relaxed">
            <ReactMarkdown
              components={{
                code: ({ inline, children, ...props }) =>
                  inline ? (
                    <code className="code-font text-xs px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300" {...props}>{children}</code>
                  ) : (
                    <pre className="bg-[#0a0a12] border border-slate-800 rounded-lg p-3 overflow-x-auto scrollbar-thin">
                      <code className="code-font text-xs text-slate-300" {...props}>{children}</code>
                    </pre>
                  ),
                p: ({ children }) => <p className="my-2">{children}</p>,
              }}
            >
              {issue.description || issue.explanation || "No details available."}
            </ReactMarkdown>
          </div>
          {issue.suggestion && (
            <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
              <Lightbulb className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-indigo-300/80 leading-relaxed">{issue.suggestion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default function AnalysisOutput({ analysis }) {
  if (!analysis) return null;

  const issues = analysis.issues || [];
  const summary = analysis.summary;

  const severityCounts = {
    critical: issues.filter(i => i.severity?.toLowerCase() === "critical").length,
    high: issues.filter(i => i.severity?.toLowerCase() === "high").length,
    medium: issues.filter(i => i.severity?.toLowerCase() === "medium").length,
    low: issues.filter(i => i.severity?.toLowerCase() === "low").length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
            Analysis Results
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {severityCounts.critical > 0 && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-medium">
              {severityCounts.critical} Critical
            </span>
          )}
          {severityCounts.high > 0 && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium">
              {severityCounts.high} High
            </span>
          )}
          <span className="text-xs text-slate-500">
            {issues.length} {issues.length === 1 ? "issue" : "issues"} found
          </span>
        </div>
      </div>

      {summary && (
        <div className="glass-card-strong p-4 rounded-xl glow-indigo">
          <p className="text-sm text-slate-300 leading-relaxed">{summary}</p>
        </div>
      )}

      <div className="space-y-2">
        {issues.map((issue, idx) => (
          <IssueCard key={idx} issue={issue} index={idx} />
        ))}
      </div>

      {issues.length === 0 && (
        <div className="py-12 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center mb-3">
            <ClipboardCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-sm text-slate-400">No issues found — your code looks clean!</p>
        </div>
      )}
    </div>
  );
}