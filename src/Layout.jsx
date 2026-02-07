import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Code2, Terminal } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        :root {
          --background: 240 10% 3.9%;
          --foreground: 0 0% 98%;
          --card: 240 10% 5.5%;
          --card-foreground: 0 0% 98%;
          --popover: 240 10% 5.5%;
          --popover-foreground: 0 0% 98%;
          --primary: 243 75% 59%;
          --primary-foreground: 0 0% 98%;
          --secondary: 240 5.9% 10%;
          --secondary-foreground: 0 0% 98%;
          --muted: 240 3.7% 15.9%;
          --muted-foreground: 240 5% 64.9%;
          --accent: 240 3.7% 15.9%;
          --accent-foreground: 0 0% 98%;
          --destructive: 0 62.8% 30.6%;
          --destructive-foreground: 0 0% 98%;
          --border: 240 3.7% 15.9%;
          --input: 240 3.7% 15.9%;
          --ring: 243 75% 59%;
        }
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        body {
          background: linear-gradient(135deg, #0a0a0f 0%, #0f0a15 50%, #0a0f1a 100%);
          background-attachment: fixed;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        * {
          border-color: hsl(240 3.7% 15.9%);
        }
        .code-font {
          font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;
        }
        .glass-card {
          background: rgba(18, 18, 26, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 163, 184, 0.08);
        }
        .glass-card-strong {
          background: rgba(18, 18, 26, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }
        .gradient-text {
          background: linear-gradient(135deg, #818cf8, #a78bfa, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow-indigo {
          box-shadow: 0 0 30px rgba(129,140,248,0.12), 0 0 60px rgba(129,140,248,0.06);
        }
        .glow-violet {
          box-shadow: 0 0 30px rgba(167,139,250,0.12), 0 0 60px rgba(167,139,250,0.06);
        }
        textarea:focus, .focus-glow:focus-within {
          box-shadow: 0 0 0 2px rgba(129,140,248,0.3), 0 0 30px rgba(129,140,248,0.15);
        }
        pre code {
          font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
          font-size: 0.8125rem;
          line-height: 1.7;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(148,163,184,0.15);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(148,163,184,0.25);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .transition-all-smooth {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .hover-lift {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-2px);
        }
        button, a, [role="button"] {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}