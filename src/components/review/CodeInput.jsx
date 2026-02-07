import React from "react";
import { FileCode, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LANGUAGES = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin", "SQL", "HTML/CSS", "Other"
];

export default function CodeInput({ code, setCode, language, setLanguage }) {
  const lineCount = code ? code.split("\n").length : 0;

  return (
    <div className="space-y-3 animate-slide-up" style={{animationDelay: '0.1s', opacity: 0}}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
            Code Input
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {lineCount > 0 && (
            <span className="text-xs text-slate-500 code-font">
              {lineCount} {lineCount === 1 ? "line" : "lines"}
            </span>
          )}
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 h-8 text-xs glass-card text-slate-300 focus:ring-indigo-500/30 hover:bg-slate-800/30 transition-all-smooth">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-slate-800">
              {LANGUAGES.map(lang => (
                <SelectItem key={lang} value={lang} className="text-xs text-slate-300 focus:bg-slate-800 focus:text-white">
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative group focus-glow rounded-xl transition-all-smooth">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-indigo-500/8 via-violet-500/5 to-transparent pointer-events-none opacity-0 group-focus-within:opacity-100 transition-all-smooth" />
        <div className="glass-card rounded-xl overflow-hidden">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your code here for AI-powered review and optimization..."
            className="code-font min-h-[280px] text-[13px] leading-relaxed bg-transparent border-none text-slate-200 placeholder:text-slate-500 resize-y focus:ring-0 scrollbar-thin p-4 w-full"
            spellCheck={false}
          />
        </div>
        {code && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-7 w-7 text-slate-600 hover:text-slate-300 hover:bg-slate-800/50 opacity-0 group-hover:opacity-100 transition-all-smooth rounded-lg"
            onClick={() => setCode("")}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}