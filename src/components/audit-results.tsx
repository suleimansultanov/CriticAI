"use client";

import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScoreRing } from "./score-ring";
import { AuditCard } from "./audit-card";
import type { AuditResult } from "@/types";

interface AuditResultsProps {
  result: AuditResult;
  blurred: boolean;
}

export function AuditResults({ result, blurred }: AuditResultsProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-6">
      {/* Header with overall score */}
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <ScoreRing score={result.overallScore} label="Overall Score" />
        <div className="flex-1">
          <h2 className="mb-2 text-2xl font-bold">{result.headline}</h2>
          <div className="flex items-start gap-2 rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
            <p className={`text-sm ${blurred ? "select-none blur-md" : ""}`}>
              <span className="font-semibold">Top Priority:</span>{" "}
              {result.topPriority}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Section cards in bento grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {result.sections.map((section) => (
          <AuditCard key={section.title} section={section} blurred={blurred} />
        ))}
      </div>
    </div>
  );
}
