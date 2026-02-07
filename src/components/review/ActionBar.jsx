import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Wand2, Loader2 } from "lucide-react";

export default function ActionBar({ onReview, onRewrite, isReviewing, isRewriting, disabled }) {
  return (
    <div className="flex flex-wrap items-center gap-3 animate-slide-up" style={{animationDelay: '0.2s', opacity: 0}}>
      <Button
        onClick={onReview}
        disabled={disabled || isReviewing}
        className="relative bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all-smooth px-6 h-11 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-400 to-indigo-300 opacity-0 hover:opacity-20 transition-opacity" />
        {isReviewing ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Search className="w-4 h-4 mr-2" />
        )}
        {isReviewing ? "Analyzing…" : "Review Code"}
      </Button>

      <Button
        onClick={onRewrite}
        disabled={disabled || isRewriting}
        className="relative bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all-smooth px-6 h-11 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-violet-400 to-purple-300 opacity-0 hover:opacity-20 transition-opacity" />
        {isRewriting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Wand2 className="w-4 h-4 mr-2" />
        )}
        {isRewriting ? "Rewriting…" : "Optimize & Rewrite"}
      </Button>

      {(isReviewing || isRewriting) && (
        <span className="text-xs text-slate-500 ml-1 animate-pulse">
          AI is processing your code…
        </span>
      )}
    </div>
  );
}