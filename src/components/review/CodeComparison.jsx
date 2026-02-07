import React, { useState } from "react";
import { Columns2, Copy, Check, FileCode, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function CodeBlock({ label, code, icon: Icon, accentColor }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="glass-card-strong rounded-t-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${accentColor}`} />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {label}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-all-smooth hover:scale-110"
            onClick={handleCopy}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <div className="bg-[#0a0a12]/80 overflow-auto max-h-[500px] scrollbar-thin">
          <pre className="p-4">
            <code className="code-font text-[13px] leading-relaxed text-slate-300 whitespace-pre">
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function CodeComparison({ original, optimized }) {
  if (!optimized) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Columns2 className="w-4 h-4 text-violet-400" />
        <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
          Code Comparison
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <CodeBlock
          label="Original Code"
          code={original}
          icon={FileCode}
          accentColor="text-slate-400"
        />
        <CodeBlock
          label="Optimized Code"
          code={optimized}
          icon={Wand2}
          accentColor="text-violet-400"
        />
      </div>
    </div>
  );
}