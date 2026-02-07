import React from "react";
import { Code2, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="pt-12 pb-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative animate-float">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 glow-indigo">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0a0f] animate-pulse-glow" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 opacity-30 blur-xl -z-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
            AI Code Review
          </h1>
          <p className="text-sm text-slate-400">
            Production-grade analysis & optimization powered by AI
          </p>
        </div>
      </div>
      <div className="h-[2px] bg-gradient-to-r from-indigo-500/50 via-violet-500/30 to-transparent rounded-full" />
    </header>
  );
}