import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import Header from "../components/review/Header";
import CodeInput from "../components/review/CodeInput";
import ActionBar from "../components/review/ActionBar";
import AnalysisOutput from "../components/review/AnalysisOutput";
import CodeComparison from "../components/review/CodeComparison";
import ErrorMessage from "../components/review/ErrorMessage";
import HealthIndicator from "../components/review/HealthIndicator";

export default function CodeReview() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [analysis, setAnalysis] = useState(null);
  const [optimizedCode, setOptimizedCode] = useState(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [error, setError] = useState(null);

  const handleReview = async () => {
    if (!code.trim()) return;
    setIsReviewing(true);
    setError(null);
    setAnalysis(null);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a senior code reviewer. Analyze the following ${language} code carefully and provide a detailed code review.

For each issue found, provide:
- title: short descriptive title
- severity: one of "critical", "high", "medium", "low"  
- category: one of "bug", "security", "performance", "suggestion"
- description: detailed explanation of the issue and why it matters
- suggestion: how to fix it
- line: approximate line number if applicable

Also provide an overall summary of the code quality.

Code to review:
\`\`\`${language}
${code}
\`\`\``,
      response_json_schema: {
        type: "object",
        properties: {
          summary: { type: "string", description: "Overall code quality summary" },
          issues: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                severity: { type: "string", enum: ["critical", "high", "medium", "low"] },
                category: { type: "string", enum: ["bug", "security", "performance", "suggestion"] },
                description: { type: "string" },
                suggestion: { type: "string" },
                line: { type: "number" },
              },
            },
          },
        },
      },
    });

    setAnalysis(result);
    setIsReviewing(false);
  };

  const handleRewrite = async () => {
    if (!code.trim()) return;
    setIsRewriting(true);
    setError(null);
    setOptimizedCode(null);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are an expert ${language} developer. Rewrite and optimize the following code. Improve readability, performance, and follow best practices. Fix any bugs. Return ONLY the optimized code, no explanations.

Original code:
\`\`\`${language}
${code}
\`\`\``,
      response_json_schema: {
        type: "object",
        properties: {
          optimized_code: { type: "string", description: "The optimized code without markdown formatting" },
        },
      },
    });

    setOptimizedCode(typeof result === 'object' && result?.optimized_code ? result.optimized_code : result);
    setIsRewriting(false);
  };

  return (
    <div className="pb-16">
      <Header />

      <div className="space-y-8">
        {/* Code Input Section */}
        <section>
          <CodeInput
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
          />
        </section>

        {/* Actions */}
        <section>
          <ActionBar
            onReview={handleReview}
            onRewrite={handleRewrite}
            isReviewing={isReviewing}
            isRewriting={isRewriting}
            disabled={!code.trim()}
          />
        </section>

        {/* Error */}
        <ErrorMessage error={error} onDismiss={() => setError(null)} />

        {/* Analysis Output */}
        {analysis && (
          <>
            <HealthIndicator analysis={analysis} />
            <section className="glass-card-strong p-6 rounded-2xl glow-indigo animate-slide-up" style={{animationDelay: '0.4s', opacity: 0}}>
              <AnalysisOutput analysis={analysis} />
            </section>
          </>
        )}

        {/* Code Comparison */}
        {optimizedCode && (
          <section className="glass-card-strong p-6 rounded-2xl glow-violet animate-slide-up" style={{animationDelay: '0.1s', opacity: 0}}>
            <CodeComparison original={code} optimized={optimizedCode} />
          </section>
        )}
      </div>
    </div>
  );
}