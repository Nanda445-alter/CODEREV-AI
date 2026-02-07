import React from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorMessage({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/15 animate-slide-up">
      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-red-300">Analysis Failed</p>
        <p className="text-xs text-red-400/70 mt-1">{error}</p>
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-red-400/50 hover:text-red-300 hover:bg-red-500/10 flex-shrink-0"
          onClick={onDismiss}
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
  );
}